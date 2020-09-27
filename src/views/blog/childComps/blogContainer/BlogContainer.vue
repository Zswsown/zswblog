<template>
    <div class="blogContainer">
        <blog-item></blog-item>
        <blog-item></blog-item>
        <blog-item></blog-item>
        <blog-item></blog-item>
        <blog-item></blog-item>

    </div>
</template>

<script>
    import BlogItem from "./BlogItem";
  export default {
    name: "BlogContainer",
    components:{
      BlogItem,
    }
  }
</script>

<style scoped>
    .blogContainer{
        width:70%;
        height:calc(100vh - 60px);

        padding:0 10px;
    }
</style>