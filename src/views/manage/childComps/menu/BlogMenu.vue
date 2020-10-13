<template>
    <div id="blogMenu">
        <div class="tabTitle">
            <img src="../../../../assets/images/blogmanage.svg" alt="">
            <span>博客管理</span>
        </div>
        <blog-menu-item path="/manage/blogManage" >
            <div slot="tabName">文章管理</div>
        </blog-menu-item>
        <blog-menu-item path="/manage/messageManage">
            <div slot="tabName">评论管理</div>
        </blog-menu-item>
        <blog-menu-item  class="tabItem" path="/manage/editorManage">
            <div slot="tabName">发布文章</div>
        </blog-menu-item>
    </div>
</template>

<script>
    import BlogMenuItem from "./BlogMenuItem";
  export default {
    name: "BlogMenu",
    components:{
      BlogMenuItem,
    }
  }
</script>

<style scoped>
    #blogMenu{
        display: flex;
        flex-direction:column;
        align-items: center;
        width: 100%;

        background: #ffffff;
        list-style:none;
        border-radius: 20px;
        margin-bottom: 20px;
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