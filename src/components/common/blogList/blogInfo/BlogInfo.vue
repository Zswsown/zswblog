<template>
    <div class="blogInfo">
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
        <insert-message class="insertMessage" :blog-i-d="blogID" @insertMessageClick="insertMessageClick"></insert-message>
    </div>
</template>

<script>
  import {$post} from "../../../../network/request";
  import InsertMessage from "../../message/insert/InsertMessage";
  import MessageList from "../../message/MessageList";
  import {BASE_URL,api} from "../../../../common/const";

  export default {
    name: "BlogInfo",
    components:{
      InsertMessage,
      MessageList,
    },
    data(){
      return{
        blogID:1,
        blogContent:'',
        messageList:[],
      }
    },
    created() {
        // 获取博客的id
        this.blogID=this.$route.params.id;
      // 请求信息
      this.getInfo(this.blogID);
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
      }
    }
  }
</script>

<style scoped>
    .blogInfo{
        height: 100%;
        width: 100%;
        overflow-y: scroll;
    }
.editor{
    min-height: 300px;
    min-width: 300px;
    z-index: 1500;
}
    .insertMessage{
        margin:20px auto;
    }
</style>