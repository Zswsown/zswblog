<template>
    <div id="materialMenu">
        <div class="tabTitle">
            <img src="../../../../assets/images/blogmanage.svg" alt="">
            <span>资料管理</span>
        </div>
        <material-menu-item class="tabItem" path="/manage/materialManage" >
            <div class="tabName" slot="tabName">链接管理</div>
        </material-menu-item>
    </div>
</template>

<script>
  // const MaterialMenuItem=()=>import("./MaterialMenuItem");
  import MaterialMenuItem from "./MaterialMenuItem";
  export default {
    name: "MaterialMenu",
    components:{
      MaterialMenuItem,
    }
  }
</script>

<style scoped>
    @media screen and (max-width:750px){
        .tabName{
            width: 5em;
        }
        .tabItem{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        span{
            width: 5em;
        }
    }
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
        /*height:45px;*/
        width:100%;
        margin: 4px 0;

        font-size:1em;
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
        margin: 4px 0;
    }
</style>