<template>
    <div id="manage">
        <tab-menu id="tabMenu"></tab-menu>
        <div class="tabContent">
<!--            <keep-alive>-->
<!--                <router-view></router-view>-->
<!--            </keep-alive>-->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import BlogManage from "./childComps/blogManage/BlogManage";
    import TabMenu from './childComps/menu/TabMenu';

    // const BlogManage=()=>import("./childComps/blogManage/BlogManage");
    // const TabMenu=()=>import("./childComps/menu/TabMenu");
  export default {
    name: "Manage",
    components:{
      TabMenu,
      BlogManage,
    }
  }
</script>

<style scoped>
#manage{
    width:1728px;
    /*height: 1020px;*/

    margin-top:60PX;

    display: flex;
    justify-content:center;
}

#tabMenu{
    width:300px;
    margin-right: 60px;
}

    .tabContent{
        display: flex;
        flex-direction: column;
        width: 1368px;

        background: rgba(255,255,255,0);
        border-radius: 10px;
        height: calc(100vh - 60PX);
    }

@media screen and (max-width:750px){
    .tabContent{
        display:flex;
        /*width: 100%;*/
        /*justify-content: center;*/
    }
    #manage{
        width: 100%;
        margin: 60PX 20px 0 20px;
    }
}
</style>