<template>
    <div id="messageManage">
        <!--        留言内容表格-->
        <message-table class="messageTable"
                       :message-list="getCurrentMessageList"
                       @deleteSelectMessages="deleteSelectMessages"></message-table>
        <!--        分页器-->
        <pagination class="pagination" :total="getMessageSum" @change="pageChange"></pagination>
    </div>
</template>

<script>
    const SERVER =require('../../../../server/common/const');
    import {$post,$get,$axios} from '../../../../network/request';
    import {chunk} from '../../../../server/common/util';

    import MessageTable from './MessageTable';
    import Pagination from "../../../../components/common/pagination/Pagination";

    // const MessageTable=()=>import("./MessageTable");
    // const Pagination=()=>import("../../../../components/common/pagination/Pagination");
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
        // 每个页面相对应的留言列表
        currentMessageList:[],
        // 留言的数量
        messageSum:0,
      }
    },
    computed:{
      // 得到当前留言的总数，将其传进分页器中，分页器才可以根据留言总数显示页码
      getMessageSum(){
        return this.messageSum;
      },
      // 计算属性监听当前页码对应的页面的留言列表
      getCurrentMessageList(){
        return this.currentMessageList;
      }
    },
    created() {
      this.getMessageList();
    },
    mounted() {
      this.$bus.$on('deleteMessage',this.deleteMessage);
    },
    methods:{
      // 获取留言列表
      // （1）先请求博客数据，然后在后台根据每个博客的blog_id去请求对应的留言数据，各个博客的留言数据数组与相应的博客文章标题合并，放在数组messageList中（每一个messageItem中都有一个blog_title）
      // （2）之后将其传入组件MessageTable中进行渲染，因为每篇博客对应着一组留言数据，而一个table中又可以包含多个tbody，tbody中又可以包含多个tr,所以每篇博客都对应的创建一个tbody（MessageBlock），放在table中
      // （3）MessageBlock组件中对对应的留言数据进行渲染
      // （4）将相同博客的留言数据的文章标题单元格进行合并，只保留一个
      // 思路：
      // 1）用refs命名给MessageItem组件取名，然后用this.$ref.名字[0]取到该文章对应的第一条留言，
      // 2）因为给组件中原生标签赋值要用注册属性v-bind:rowspan，用js取出来的dom结点不知道怎么赋值，所以在MessageItem组件中data定义一个rowspanNum值，计算属性computed中用rowspan()监听该值的变化
      //    然后在文章标题的td标签上绑定:rowspan=rowspan，当MessageBlock中MessageItem组件mounted完成后，通过this.$refs.名字[0].rowspanNum=该文章对应的留言数，就可以合并相对应的单元格
      // 3）在之前是没有将文章标题的标签td渲染出来的，用计算属性isShow监听isBlogTitleShow值的变化，当在赋值rowspanNum时也赋值isBlogTitleShow为true，即可将文章标题对应的单元格会显示出来

      // 数据的处理：
      // 1）因为后台返回的数据是一个二维数组（每篇博客对应一个留言数组，博客又充当着大数组中的子元素），所以先对其进行数组扁平化处理，处理为一维数组，
      // 2）再进行自定义尺寸分割，分割成每页限定显示的留言条数，此时为二维数组
      // 3）因为我们想实现同个文章的文章标题的单元格进行合并的功能，所以将二维数组转变为三维数组，每个二维数组中的元素按照blog_id进行划分，划分成相对应的小数组，添加到数组中（此时为三维数组）
      getMessageList(){
        // 请求博客数据
        $get(SERVER.BASE_URL+SERVER.api.SELECT_BLOGS).then(res=>{
          // 将博客数据作为参数传递给后台，请求留言列表，这一步主要是为了获取blog_id和blog_title
          $post(SERVER.BASE_URL+SERVER.api.SELECT_MESSAGE_LIST,{
            blogs:res.data.result
          }).then(respond=>{
            // 得到留言列表
            this.messageList=respond.data.result;

            // for(let i=0;i<this.messageList.length;i++){
            //   // 在每一个留言数据后面添加对应的文章标题和文章id
            //   for(let j=0;j<this.messageList[i].length;j++){
            //     this.messageList[i][j].blog_title=res.data.result[i].blog_title;
            //     this.messageList[i][j].blog_id=res.data.result[i].blog_id;
            //   }
            // }
            console.log(this.messageList);

            // 将二维数组转换成一维数组
            this.messageList=[].concat.apply([],this.messageList);
            // 这时候可以得到留言总数messageSum，传递给分页器，分页器会显示相应的页码数目
            this.messageSum=this.messageList.length;
            // 再将一维数组进行切割，分割成想要尺寸的二维数组
            this.messageList=chunk(this.messageList,10);
            // 这时候如果不想进行合并单元格的操作，可以直接用这数据做分页器对应的总的留言列表
            // 对二维数组中的元素进行切割，分割成对应的blog_id的小数组，此时留言列表为三维数组
            for(let i=0;i<this.messageList.length;i++){
              this.messageList[i]=this.messageList[i].reduce((total,currentValue)=>{
                if(total[total.length-1].find(item=>item.blog_id===currentValue.blog_id)!==undefined || total[0].length===0){
                  total[total.length-1].push(currentValue);
                }
                else{
                  total.push([currentValue]);
                }
                return total;
              },[[]]);
            }
            // 默认显示留言列表的第一个二维数组
            this.currentMessageList=this.messageList[0];
            // console.log(this.currentMessageList);
            // console.log(this.messageList);
          })
        })
      },

      // 当分页组件被点击时，会传出相对应的页数，我们则将相应页面的数据显示出来，页码（从1开始）比数组下标（从0开始）大1，所以要减1
      pageChange(page){
        this.currentMessageList=this.messageList[page-1];
      },

      // 删除留言操作
      deleteMessage(id){
        $post(SERVER.BASE_URL+SERVER.api.DELETE_MESSAGE,{
          message_id:id,
        }).then((res)=>{
          console.log(res);
          this.getMessageList();
        })
      },

      // 删除多条留言
      deleteSelectMessages(deleteMessageIDs){
        // console.log(deleteMessageIDs);
        $post(SERVER.BASE_URL+SERVER.api.DELETE_MESSAGES,{
          deleteMessageIDs:deleteMessageIDs
        }).then((res)=>{
          if(!(res.data.err==null)){
            this.$toast.show('服务器繁忙',2000);
          }
          else{
            this.$toast.show('删除留言成功',2000);
            this.getMessageList();
          }
        })
      }
    }
  }
</script>

<style scoped>
    #messageManage{
        width: 100%;
    }
.messageTable{
    /*width: 1370px;*/
    width: 100%;
    /*max-width: 1370px;*/
    /*max-height: 1000px;*/
    background: rgba(255,255,255,.8);
    color: #000;
}
</style>