<template>
    <div id="blogAgainManage">
        <editor-title @publish="edit" :blog-title="blogTitle"></editor-title>
        <editor-again class="editorAgain"
                :box-shadow="isBoxShadow"
                :blog-title="blogTitle"
                :blog-content="blogContent"></editor-again>
    </div>
</template>

<script>
  import EditorAgain from "./EditorAgain";
  import EditorTitle from "./EditorTitle";
  // const EditorAgain=()=>import("./EditorAgain");
  // const EditorTitle=()=>import("./EditorTitle");

  import {$post} from "../../network/request";
  import {api, BASE_URL} from "../../common/const";

  export default {
    name: "EditorAgainManage",
    components:{
      EditorAgain,
      EditorTitle,
    },
    data(){
      return{
        blogID:1,

        blogTitle:'',

        blogContent:'',

        isBoxShadow:false,
      }
    },
    created(){
      // 获取要编辑的博客的id
      this.blogID=this.$route.params.id;
      // 请求博客信息
      this.getBlogInfo(this.blogID);
    },

    methods:{
      // 请求博客信息
      getBlogInfo(id){
        $post(BASE_URL+api.SELECT_BLOG,{blog_id:id})
          .then(res=>{
            this.blogContent=res.data.result[0].blog_text_content;
            this.blogTitle=res.data.result[0].blog_title;
            console.log(this.blogTitle);
          });
      },

      // 发布文章
      edit(title){
        // 因为利用props传值时，在赋值前有可能事件总线就发出事件了，导致Editor取不到文章标题，
        // 所以采用异步解决掉该问题，等到文章标题有值了，再调用事件总线的方法

        // 1.将文章标题传进去编辑器中，便于编辑器在保存时将文章标题与其渲染的render拼接在一起
        let promise= new Promise((resolve,reject)=>{
          this.blogTitle= title;
          resolve();
        });
        promise.then(()=>{
          // 2.告诉编辑器，我点击了发布按钮，触发保存操作
          this.$bus.$emit('edit',this.blogID);
        })
      },
    }
  }
</script>

<style scoped>
    #blogAgainManage{
        width:100%;
        height:100%;
    }

    .editorAgain{
        width:100%;
        height:100%;
    }
</style>