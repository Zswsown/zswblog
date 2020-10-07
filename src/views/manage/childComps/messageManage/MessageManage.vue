<template>
    <div id="messageManage">
        <!--        留言内容表格-->
        <message-table class="messageTable" :message-list="messageList"></message-table>
        <!--        分页器-->
        <pagination class="pagination" :total="getMessageSum" @change="pageChange"></pagination>
    </div>
</template>

<script>
    import {$post,$get,$axios} from '../../../../network/request'
    import {BASE_URL,api} from "../../../../common/const";

    import MessageTable from './MessageTable';
    import Pagination from "../../../../components/common/pagination/Pagination";

  export default {
    name: "MessageManage",
    components:{
      MessageTable,
      Pagination,
    },
    data(){
      return{
        // 总的留言列表
        messageList:[],
        tempMessageList:[],
        // 每个页面相对应的留言列表
        smallMessageList:[],
        // 留言的数量
        messageSum:0,
      }
    },
    computed:{
      getMessageSum(){
        for(let i=0;i<this.messageList.length;i++){
            this.messageSum+=this.messageList[i].length;
        }
        return this.messageSum;
      }
    },
    created() {
      this.getMessageList();
    },
    methods:{
      // 获取留言列表
      // （1）先请求博客数据，然后在后台根据每个博客的blog_id去请求对应的留言数据，各个博客的留言数据数组与相应的博客文章标题合并，放在数组messageList中
      // （2）之后将其传入组件MessageTable中进行渲染，因为每篇博客对应着一组留言数据，而一个table中又可以包含多个tbody，tbody中又可以包含多个tr,所以每篇博客都对应的创建一个tbody（MessageBlock），放在table中
      // （3）MessageBlock组件中对对应的留言数据进行渲染
      // （4）将相同博客的留言数据的文章标题单元格进行合并，只保留一个
      // 思路：
      // 1）用refs命名给MessageItem组件取名，然后用this.$ref.名字[0]取到该文章对应的第一条留言，
      // 2）因为给组件中原生标签赋值要用注册属性v-bind:rowspan，用js取出来的dom结点不知道怎么赋值，所以在MessageItem组件中data定义一个rowspanNum值，计算属性computed中用rowspan()监听该值的变化
      //    然后在文章标题的td标签上绑定:rowspan=rowspan，当MessageBlock中MessageItem组件mounted完成后，通过this.$refs.名字[0].rowspanNum=该文章对应的留言数，就可以合并相对应的单元格
      // 3）在之前是没有将文章标题的标签td渲染出来的，用计算属性isShow监听isBlogTitleShow值的变化，当在赋值rowspanNum时也赋值isBlogTitleShow为true，即可将文章标题对应的单元格会显示出来
      getMessageList(){
        $get(BASE_URL+api.SELECT_BLOGS).then(res=>{
          $post(BASE_URL+api.SELECT_MESSAGE_LIST,{
            blogs:res.data.result
          }).then(respond=>{
            this.messageList=respond.data.result;
            this.tempMessageList=respond.data.result;
            for(let i=0;i<respond.data.result.length;i++){
              this.messageList[i].blog_title=res.data.result[i].blog_title;
              // 改：
              for(let j=0;j<this.messageList[i].length;j++){
                this.tempMessageList[i][j].blog_title=res.data.result[i].blog_title;
              }
            }
            console.log(this.messageList);

            // 改：
            // 将二维数组转换成一维数组
            this.tempMessageList=[].concat.apply([],this.tempMessageList);
            // 再将一维数组进行切割，分割成想要尺寸的二维数组
            this.tempMessageList=this.chunk(this.tempMessageList,10);
            console.log(this.tempMessageList);
          })
        })
      },

      // 切割方法，将总的留言数组切割成我们在分页器中设定的每页的留言总数（默认为10条），当点击对应的页码时，则显示对应的留言小数组
      // 默认传进来的数组为空，切割的小数组的长度为1
      chunk(arr=[],size=1){
        // 当数组为空时，返回一个空数组
        if(arr.length===0)return [];
        // 当数组不为空时
        return arr.reduce((total,currentValue)=>{
          // 当小数组的长度与规定的长度相等时，则新创建一个小数组，并将currentValue作为下一个小数组的起始值
          if(total[total.length-1].length===size){
            total.push([currentValue]);
          }
          // 当小数组的长度小于规定的长度size时，则将currentValue作为该小数组的元素
          else{
            total[total.length-1].push(currentValue);
          }
          return total;
        },[[]]);//[[]]是为了将分割后的小数组仍保留在一个大数组中
      },

      // 当分页组件被点击时，会传出相对应的页数，我们则将相应页面的数据显示出来
      pageChange(page){

        console.log(this.chunk(this.tempMessageList,10));
      }
    }
  }
</script>

<style scoped>
.messageTable{
    width: 1370px;
    max-width: 1370px;
    max-height: 1000px;
}

</style>