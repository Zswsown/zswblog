<template>
    <div id="blog">
<!--        <router-view></router-view>-->
        <blog-container></blog-container>
        <aside-container></aside-container>
    </div>
</template>


<script>
    import BlogContainer from "./childComps/blogContainer/BlogContainer";
    import AsideContainer from "./childComps/AsideContainer";

    // const BlogContainer=()=>import("./childComps/blogContainer/BlogContainer");
    // const AsideContainer=()=>import("./childComps/AsideContainer");
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
        justify-content: center;
        margin-top:60PX;

        width:1546px;
        height:calc(100vh - 60PX);
        /*overflow-y: scroll;*/
    }
    @media screen and (max-width:750px){
        #blog{
            width: 100%;
        }
    }
</style>