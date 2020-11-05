<template>
    <tr class="messageItem" ref="tr">
        <!--        复选框-->
        <td class="select">
            <input :checked="getSelectState" ref="select" type="checkbox" name="messageSelect" @click="itemClick">
        </td>
        <!--        文章标题-->
        <td :rowspan="rowspan" v-if="isShow">
            {{messageItem.blog_title}}
        </td>
        <!--        留言作者-->
        <td ref="message_author">
            {{messageItem.message_author}}
        </td>
        <!--        留言内容-->
        <td>
            {{messageItem.message_content}}
        </td>
        <!--        留言作者邮箱-->
        <td>
<!--            <input ref="message_author_email" class="message_author_email" type="text" :value="messageItem.message_author_email">-->
            <textarea ref="message_author_email" class="message_author_email">{{messageItem.message_author_email}}</textarea>
        </td>
        <!--        留言创建时间-->
        <td class="createtime">
            {{getFormatTime}}
        </td>
        <!--        对留言的操作-->
        <td class="behavior">
            <input class="delete" @click="deleteMessage" type="button" value="删除">
            <input class="reply" @click="replyMessage" type="button" value="回复">
        </td>
    </tr>
</template>

<script>
    import {format} from "../../../../common/utils";

    export default {
    name: "MessageItem",
    props:{
      // 留言
      messageItem:{
        type:Object,
        default(){
          return {}
        }
      },
    },
      data(){
          return{
            // 是否显示文章标题
            isBlogTitleShow:false,
            // 跨行合并单元格个数
            rowspanNum:0,
            textareaHeight:document.getElementsByTagName("td")[1].offsetHeight,
          }
      },
        mounted() {
          // 监听屏幕尺寸改变时文本框的高度也发生相应改变，防止生成滚动条
          this.$bus.$on('resizeTdHeight',this.resizeTdHeight);
        },
      computed:{
          // 得到当前留言的当选框的状态
          getSelectState(){
            return this.messageItem.message_selected===0?false:true;
          },

          // 将数据库取到的时间格式化
          getFormatTime(){
            return format(this.messageItem.message_createtime);
          },

          // 是否显示文章标题
          isShow(){
            return this.isBlogTitleShow;
          },

          // 动态监听文章标题对应的rowspan的数目有没有变化
          rowspan(){
            return this.rowspanNum;
          }
        },
      methods:{
        // 删除留言
        deleteMessage(){
          this.$bus.$emit('deleteMessage',this.messageItem.message_id);
        },

        // 回复留言
        replyMessage(){
          // 先选中留言人的邮箱地址
          let email=this.$refs.message_author_email.select();
          // 执行复制操作，这时候邮箱地址被保存在剪切板中了
          document.execCommand("Copy");
          // 移除input框的焦点
          this.$refs.message_author_email.blur();
          // 显示提示框
          this.$toast.show('复制邮箱地址成功，正在跳转',1000);
          // 设置定时器，让用户看到提示内容（复制邮箱地址成功，正在跳转）,然后再打开新的网页
          setTimeout(()=>{
            window.open('https://mail.163.com/');
          },1000);
        },

        // 当单选框被点击时，则单选框的状态发生变化
        itemClick(){
          // 因为mysql中没有boolean类型，只能用数字0代表false，数字1代表true，点击后进行取反（发送事件给MessageTable中的事件总线监听到）
          this.messageItem.message_selected=this.messageItem.message_selected===0?1:0;
          this.$bus.$emit('itemClick');
        },
        resizeTdHeight(){
          // console.log(222);
          if(this.$refs.message_author_email!==undefined){
            if(this.$refs.message_author_email.clientHeight<this.$refs.message_author_email.scrollHeight){
              if(this.$refs.message_author_email.scrollHeight>this.$refs.tr.clientHeight){
                this.$refs.message_author_email.style.height=this.$refs.message_author_email.scrollHeight+'px';
              }
              else{
                this.$refs.message_author_email.style.height=this.$refs.tr.offsetHeight+'px';
              }

            }
          }
        }
      }
  }
</script>

<style scoped>
    .delete,.reply{
        display:inline-block;
        width:3em;
        margin:0 8px;

        border-radius: 5px;
        border:1px solid #ccc;
        color: #fff;
        background: #7d3990;
        font-size: 1em;
        line-height: 1em;
        padding: 6px;
    }

    .delete:focus,.reply:focus{
        border:1px solid #d9d9d9;
        outline: none;
    }

    td{
        border:1px solid #000;
        padding:6px 8px;
        text-align: center;
        font-size: 1em;
    }

    td input{
        font-size: 1em;
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
    .message_author_email{
        background:none;
        outline:none;
        border:none;
        padding: 0;
        margin: 0;
        text-align: center;
        resize: none;
        display: inline-block;
        width: 100%;
        font-size: 1em;
    }
</style>