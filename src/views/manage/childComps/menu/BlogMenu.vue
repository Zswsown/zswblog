<template>
    <div id="blogMenu">
        <div class="tabTitle">
            <img src="../../../../assets/images/blogmanage.svg" alt="">
            <span>博客管理</span>
        </div>
        <blog-menu-item class="tabItem1" path="/manage/blogManage" >
            <div class="tabName" slot="tabName">文章管理</div>
        </blog-menu-item>
        <blog-menu-item class="tabItem1" path="/manage/messageManage">
            <div class="tabName" slot="tabName">评论管理</div>
        </blog-menu-item>
        <blog-menu-item  class="tabItem" path="/manage/editorManage">
            <div class="tabName" slot="tabName">发布文章</div>
        </blog-menu-item>
    </div>
</template>

<script>
    import BlogMenuItem from "./BlogMenuItem";
    // const BlogMenuItem=()=>import("./BlogMenuItem");
  export default {
    name: "BlogMenu",
    components:{
      BlogMenuItem,
    }
  }
</script>

<style scoped>
    @media screen and (max-width:750px){
       .tabName{
           width: 5em;
       }
        .tabItem,.tabItem1{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        span{
            width: 5em;
        }
    }

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

    .tabItem1{
        margin: 4px 0;
    }
</style>