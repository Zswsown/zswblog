<template>
    <table class="messageTable">
        <thead>
            <tr>
                <th class="select"></th>
                <th>文章标题</th>
                <th>留言作者</th>
                <th>留言内容</th>
                <th class="email">邮箱地址</th>
                <th class="createtime">留言时间</th>
                <th class="behavior">操作</th>
            </tr>
        </thead>
        <!--        留言块-->
        <message-block ref="messageBlock"
                       v-for="(item,index) in messageList"
                       :message-block="item"></message-block>
        <message-bottom @selectAll="selectAll"
                        @deleteSelectMessages="deleteSelectMessages"
                        :select-all-state="selectAllState"></message-bottom>
    </table>
</template>

<script>
    import MessageBlock from "./MessageBlock";
    import MessageBottom from "./MessageBottom";
    import {BASE_URL,api} from "../../../../common/const";
    import {$post} from "../../../../network/request";

  export default {
    name: "MessageTable",
    components: {
      MessageBlock,
      MessageBottom,
    },
    props:{
      messageList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        messageBlock:[],
        // 全选按钮的状态，默认为不选中
        selectAllState: 0,
        // 留言列表中被选中的留言的数量
        selectSum:0,
        // 该页面中留言列表的长度
        messageListLength:0,
      }
    },
    mounted() {
      // 事件总线监听MessageItem中发出的留言的复选框被点击时发出的事件
      this.$bus.$on('itemClick',this.selectStateChange);
    },

    methods:{
      // 在进行全选时，分为两种情况：
      // （1）点击全选按钮，页面中留言列表的留言的选中状态与全选按钮的状态一致
      // （2）点击页面中留言列表的某条留言的单选框，若子留言全部被选中，则全选按钮改为选中状态；
      //     若处于子留言全部被选中，此时某条子留言取消选中，则全选按钮改为不选中状态

      // 第一种情况：全选按钮被点击，将留言列表中的留言的选中状态与全选按钮的状态保持一致
      // （1）利用ref命名取出页面中的留言块（这里用refs取出的留言块为数组，因为我们页面中不止一个留言块），
      //      留言块中的留言数组（$children）中的元素则是子留言，遍历，将它们的状态改为与全选按钮的状态保持一致
      selectAll(selectState){
        let messageBlock=this.$refs.messageBlock;
        for(let i=0;i<messageBlock.length;i++){
          for(let j=0;j<messageBlock[i].$children.length;j++){
            selectState=selectState===1?1:0;
            messageBlock[i].$children[j].messageItem.message_selected=selectState;
          }
        }
      },

      // 第二种情况：点击页面中留言列表的某条留言的单选框，若子留言全部被选中，则全选按钮改为选中状态；
      //           若处于子留言全部被选中，此时某条子留言取消选中，则全选按钮改为不选中状态
      // （1）每次点击时将上次的留言选中的数量清空，且将上次记录的该页面的留言列表的长度也清空
      // （2）遍历每一个留言块中有没有不被选中的留言，有的话，则直接将全选按钮的状态改为不选中，且跳出当前循环
      // （3）若当前留言块的留言全被选中，则将该留言块中的数量添加进selectSum中，接着进入下一个留言块的判断
      // （4）若留言选中的数量与该页面中留言列表的数量一致，则将全选按钮的状态改为被选中

      // 在mounted中调用该方法监听页面中各条留言状态的改变
      selectStateChange(obj){
        // 留言被选中的数量，清0
        this.selectSum=0;
        // 该页面中留言列表的长度，清0
        this.messageListLength=0;

        let messageBlock=this.$refs.messageBlock;
        for(let i=0;i<messageBlock.length;i++){
          this.messageListLength+=messageBlock[i].$children.length;
          // 遍历每一个留言块中有没有不被选中的留言，有的话，则直接将全选按钮的状态改为不选中，且跳出当前循环
          if(messageBlock[i].$children.find(item=>item.messageItem.message_selected==0)!==undefined){
            this.selectAllState=0;
            return;
          }
          else{
            // 若当前留言块的留言全被选中，则将该留言块中的数量添加进selectSum中，接着进入下一个留言块的判断
            this.selectSum+=messageBlock[i].$children.length;
            console.log(this.selectSum);
          };
        }
        // 若留言选中的数量与该页面中留言列表的数量一致，则将全选按钮的状态改为被选中
        if(this.selectSum===this.messageListLength){
          this.selectAllState=1;
        }
      },

      // 删除多条留言分为两种情况：
      // （1）全选按钮被选中，则直接将全部留言的message_id直接传给后台进行删除；
      // （2）全选按钮未被选中，则遍历全部留言，若某条留言被选中，则将其message_id push进要传递给后台的deleteMessageIDS数组中
      deleteSelectMessages(selectState){
        let messageBlock=this.$refs.messageBlock;
        let deleteMessageIDs=[];
        // 全选按钮被选中，则直接将全部留言的message_id直接传给后台进行删除
        if(selectState===1){
          for(let i=0;i<messageBlock.length;i++){
            for(let j=0;j<messageBlock[i].$children.length;j++){
              deleteMessageIDs.push(messageBlock[i].$children[j].messageItem.message_id);
            }
          }
        }
        // 全选按钮未被选中，则遍历全部留言，若某条留言被选中，则将其message_id push进要传递给后台的deleteMessageIDS数组中
        else{
          for(let i=0;i<messageBlock.length;i++){
            for(let j=0;j<messageBlock[i].$children.length;j++){
              if(messageBlock[i].$children[j].messageItem.message_selected===1){
                deleteMessageIDs.push(messageBlock[i].$children[j].messageItem.message_id);
              }
            }
          }
        }
        // 若deleteMessageIDS的长度不为0，则将其传递给父组件，让父组件发送http请求给后台，进行删除多条留言操作
        if(deleteMessageIDs.length!==0){
          deleteMessageIDs='('+deleteMessageIDs.join(',')+')';
          this.$emit('deleteSelectMessages',deleteMessageIDs);
        }
        else{
          this.$toast.show('未选中留言',2000);
        }
      }
    },
  }
</script>

<style scoped>
    .messageTable{
        border-collapse: collapse;
        border:1px solid #000;
        font-size:18px;
    }

    th{
        border:1px solid #000;
        padding:6px 8px;
    }

    .behavior{
        height:53px;
        width:249px;
    }

    .createtime{
        width: 185px;
        height: 53px;
    }

    .select{
        width: 30px;
        height: 53px;
    }

    .email{
        width: 235px;
        height: 53px;
    }

</style>