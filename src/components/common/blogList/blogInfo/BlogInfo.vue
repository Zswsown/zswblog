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
                      :boxShadow="false"
                      :toolbarsFlag="false"
                      :editable="false"
                      :ishljs="true" ></mavon-editor>
        <insert-message class="insertMessage"></insert-message>
    </div>
</template>

<script>
  import {$post} from "../../../../network/request";
  import InsertMessage from "../../message/InsertMessage";

  export default {
    name: "BlogInfo",
    components:{
      InsertMessage
    },
    data(){
      return{
        BASE_URL:'http://localhost:3000/api/selectBlog',
        blogID:1,
        blogContent:'',
      }
    },
    created() {
        // 获取博客的id
        this.blogID=this.$route.params.id;
    },
    mounted() {
      // 请求博客信息
      this.getBlogInfo(this.blogID);
    },
    methods:{
      // 请求博客信息
      getBlogInfo(id){
        $post(this.BASE_URL,{blog_id:id})
          .then(res=>{
            console.log(res.data.result[0].blog_content);
            this.blogContent=res.data.result[0].blog_content;
          });
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