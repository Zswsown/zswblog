<template>
    <div id="blogManage">
        <editor-title @publish="publish"></editor-title>
        <editor class="editor"
                :box-shadow="isBoxShadow"
                :blog-title="blogTitle"></editor>
    </div>
</template>

<script>
  import EditorTitle from "./EditorTitle";
  import Editor from "./Editor";

  // const EditorTitle=()=>import("./EditorTitle");
  // const Editor=()=>import("./Editor");
  export default {
    name: "EditorManage",
    data(){
      return{
        blogTitle:'',
        isBoxShadow:false,
      }
    },
    components:{
      Editor,
      EditorTitle,
    },
    methods:{
      // 发布文章
      publish(title){
        // 因为利用props传值时，在赋值前有可能事件总线就发出事件了，导致Editor取不到文章标题，
        // 所以采用异步解决掉该问题，等到文章标题有值了，再调用事件总线的方法

        // 1.将文章标题传进去编辑器中，便于编辑器在保存时将文章标题与其渲染的render拼接在一起
        let promise= new Promise((resolve,reject)=>{
          this.blogTitle= title;
          resolve();
        });
        promise.then(()=>{
          // 2.告诉编辑器，我点击了发布按钮，触发保存操作
          this.$bus.$emit('publish')
        })
      },
    }
  }
</script>

<style scoped>
    #blogManage{
        width:100%;
        height:100%;
    }

    .editor{
        width:100%;
        height:calc(100% - 76PX);
    }
</style>