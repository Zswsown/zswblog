<template>
    <div class="editorTitle">
        <h2 class="h">文章标题</h2>
        <input type="text" id="title" :value="blogTitle">
        <button class="publish" @click="publish">发布文章</button>
    </div>
</template>

<script>
  export default {
    name: "EditorTitle",

    data(){
      return{
        // blogTitle:''
      }
    },

    props:{
      blogTitle:{
        type:String,
        default(){
          return ''
        }
      }
    },

    methods:{
      // 新增文章
      publish(){
        let title=document.getElementById('title').value;
        if(title.length===0){
          alert('文章标题为空');
        }
        else{
          this.$emit('publish',title);
        }
      },
    }
  }
</script>

<style scoped>
    .editorTitle{
        height: 50px;
        padding: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        border-radius: 10px 10px 0 0 ;
    }
    .h{
        width:100px;
    }
    .publish{
        width:100px;
        height:40px;
        border-radius: 5px;
        border:1px solid #ccc;

        background: #7d3990;
    }
    #title{
        flex: 1;
        height: 40px;
        font-size: 18px;
        margin:0 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
    }
</style>