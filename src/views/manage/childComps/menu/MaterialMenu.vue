<template>
    <div id="materialMenu">
        <div class="tabTitle">
            <img src="../../../../assets/images/blogmanage.svg" alt="">
            <span>资料管理</span>
        </div>
        <material-menu-item class="tabItem" path="/manage/materialManage" >
            <div slot="tabName">链接管理</div>
        </material-menu-item>
    </div>
</template>

<script>
  import MaterialMenuItem from "./MaterialMenuItem";
  export default {
    name: "MaterialMenu",
    components:{
      MaterialMenuItem,
    }
  }
</script>

<style scoped>
    #materialMenu{
        display: flex;
        flex-direction:column;
        align-items: center;
        width: 100%;

        background: #ffffff;
        list-style:none;
        border-radius: 20px;
    }
    .tabTitle{
        height:45px;
        width:100%;

        font-size:16px;
        font-weight:700;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }
    .tabTitle img{
        height: 20px;
        width:20px;
        margin-right:5px;

    }

    .tabItem{
        border-bottom: 1px solid transparent;
    }
</style>