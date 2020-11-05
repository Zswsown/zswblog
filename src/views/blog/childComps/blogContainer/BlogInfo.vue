<template>
    <div id="blogInfo">
        <blog-item-info></blog-item-info>
        <aside-container></aside-container>
    </div>
</template>

<script>
    import AsideContainer from '../../childComps/AsideContainer';
    import BlogItemInfo from './BlogItemInfo';
    // const AsideContainer=()=>import("../../childComps/AsideContainer");
    // const BlogItemInfo=()=>import("./BlogItemInfo");

  export default {
    name: "BlogInfo",
    components:{
      AsideContainer,
      BlogItemInfo,
    }
  }
</script>

<style scoped>
    #blogInfo{
        display:flex;
        justify-content: center;
        margin-top:60PX;

        width:1546px;
        height:calc(100vh - 60PX);
    }
    @media screen and (max-width:750px){
        #blogInfo{
            width: 100%;
        }
    }
</style>