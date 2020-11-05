<template>
    <div class="blogList">
        <blog-item class="blogItem" v-for="(item,index) in blogList" :blog-item="item" :key="index"></blog-item>
    </div>
</template>

<script>
    import BlogItem from "./BlogItem";
    // const BlogItem=()=>import("./BlogItem");
  export default {
    name: "BlogList",
    components:{
      BlogItem,
    },
    props:{
      blogList:{
        type:Array,
        default(){
          return [];
        }
      }
    },

  }
</script>

<style scoped>
    .blogList{
        overflow: hidden;
    }
.blogItem{
    width:100%;
    box-sizing: border-box;
}
</style>