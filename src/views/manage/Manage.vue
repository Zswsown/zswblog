<template>
    <div id="manage">
        <tab-menu class="tabMenu"></tab-menu>
        <div class="tabContent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import BlogManage from "./childComps/blogManage/BlogManage";
import TabMenu from './childComps/menu/TabMenu'
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
    position:fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    width:90%;
    height: 100%;

    margin-top:60px;

    display: flex;
    justify-content:center;
}

.tabMenu{
    width:20%;
    margin:0 5px;
}

    .tabContent{
        display: flex;
        flex-direction: column;
        flex:1;
        background: #fff;
        border-radius: 10px;
    }
</style>