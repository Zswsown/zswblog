<template>
    <div id="blog">
        <router-view></router-view>
        <aside-container></aside-container>
    </div>
</template>


<script>
    import BlogContainer from "./childComps/blogContainer/BlogContainer";
    import AsideContainer from "./childComps/AsideContainer";
  export default {
    name: "Blog",
    components:{
      BlogContainer,
      AsideContainer,
    }
  }
</script>

<style scoped>
    #blog{
        display:flex;
        margin-top:60px;

        width:80%;
        height:calc(100vh - 60px);
    }
</style>