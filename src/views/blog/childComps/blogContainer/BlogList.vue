<template>
    <div class="blogList">
        <blog-item v-for="(item,index) in blogList" :blog-item="item" :key="index"></blog-item>
    </div>
</template>

<script>
    import BlogItem from "./BlogItem";
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

</style>