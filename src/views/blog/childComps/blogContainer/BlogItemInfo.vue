<template>
    <div class="blogItemInfo">
        <!--        :value="blogContent"引入要转换的内容-->
        <!--        :subfield="false"开启单栏模式-->
        <!--        :defaultOpen=""默认展示预览区域-->
        <!--        :toolbarsFlag="false"关闭工具栏-->
        <!--        :editable="false"不允许编辑-->
        <!--        scrollStyle="true"开启滚动条样式（仅支持Chrome）-->
        <!--        :ishljs="true"开启代码高亮-->
        <mavon-editor class="editor"
                      ref="md"
                      :value="blogContent"
                      :subfield="false"
                      defaultOpen="preview"
                      previewBackground="#ffffff"
                      :boxShadow="false"
                      :toolbarsFlag="false"
                      :editable="false"
                      :ishljs="true" ></mavon-editor>
        <message-list :message-list="messageList"></message-list>
        <insert-message class="insertMessage" :blog-i-d="blogID" :blog-title="getBlogTitle" @insertMessageClick="insertMessageClick"></insert-message>
    </div>
</template>

<script>
  import {$post,$get} from "../../../../network/request";
  import {BASE_URL,api} from "../../../../common/const";
  import InsertMessage from "../../../../components/common/message/insert/InsertMessage";
  import MessageList from "../../../../components/common/message/MessageList";

  // const InsertMessage=()=>import("./BlogItemInfo");
  // const MessageList=()=>import("../../../../components/common/message/MessageList");
  export default {
    name: "BlogItemInfo",
    components:{
      InsertMessage,
      MessageList,
    },
    data(){
      return{
        blogID:1,
        blogTitle:'',
        blogContent:'',
        messageList:[],
        watchSum:0,
      }
    },
    created() {
      // 获取博客的id
      this.blogID=this.$route.params.id;
      // 请求信息
      this.getInfo(this.blogID);

      this.getWatchSum();
    },
    computed:{
      getBlogTitle(){
        return this.blogTitle;
      }
    },
    methods:{
      // 请求信息，先请求博客内容，再渲染留言列表
      async getInfo(id){
        await this.getBlogInfo(id);
        this.getBlogMessage(id);
      },

      // 请求博客信息
      getBlogInfo(id){
        $post(BASE_URL+api.SELECT_BLOG,{blog_id:id})
          .then(res=>{
            this.blogTitle=res.data.result[0].blog_title;
            this.blogContent=res.data.result[0].blog_content;
          });
      },

      //请求博客对应的评论
      getBlogMessage(id){
        $post(BASE_URL+api.SELECT_MESSAGE,{blogID:id}).then((res)=>{
          this.messageList=res.data.result;
        })
      },

      // 添加留言后进行刷新页面操作，重新获取留言信息
      insertMessageClick(){
        // console.log('我被执行了');
        this.getBlogMessage(this.blogID);
      },

      getWatchSum(){
        $get(BASE_URL+api.SELECT_WATCH_SUM).then((res)=>{
          console.log(res.data.result);
          this.watchSum=res.data.result;
          this.watchSum++;
          $post(BASE_URL+api.UPDATE_WATCH_SUM,{
            watchSum:this.watchSum,
          }).then((res)=>{
            console.log(res);
          })
        })
      }
    }
  }
</script>

<style scoped>
    /*.blogItemInfo{*/
    /*    width:70%;*/
    /*    height:calc(100vh - 60px);*/

    /*    padding:0 10px;*/
    /*}*/

    .blogItemInfo{
        /*height: 1010px;*/
        width: 1030px;
        margin-right: 30px;
        margin-bottom: 10px;
        padding:0 45px;
        overflow-y: scroll;
        background: #ffffff;
        border-radius: 10px;
    }

    @media screen and (max-width:750px){
        .blogItemInfo{
            width: 100%;
            margin:0 20px 10px 20px;
        }
    }

    .blogItemInfo::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
        scrollbar-arrow-color:#ccc;
    }
    .blogItemInfo::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.1);
        scrollbar-arrow-color:#fff;
    }
    .blogItemInfo::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
    .editor{
        min-height: 300px;
        min-width: 300px;
        border: none;
        z-index: 1;
    }
    .insertMessage{
        margin:20px auto;
    }
</style>