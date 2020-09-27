<template>
    <div class="navBarItem"
         @click="itemClick"
         :class="{active:isActive===true}">
        <slot name="nav-title">首页</slot>
    </div>
</template>

<script>
  export default {
    name: "NavBarItem",
    props:{
      path:{
        //必须传值
        require:true,
        type:String
      }
    },
    computed:{
      // 将路由配置中的所有path与当前传进来的path对比，若有当前传进来的path,则文字高亮
      isActive(){
        // 上面这种当别的父路由中的子路由的名字和this.path相同时，会出错
        // return this.$route.path.indexOf(this.path)!==-1;
        return this.$route.path.slice(0,this.path.length)===this.path;
      },
    },
    methods:{
      // 当icon被点击时，将路由的路径替换为当前传进来的path,replace不可后退
      itemClick(){
        this.$router.push(this.path)
          // .catch((res)=>{console.log(res)});
      }
    }
  }
</script>

<style scoped>
    .navBarItem{
        display: flex;
        justify-content: center;
        align-items:center;

        font-size:16px;
        font-weight:700;

        height:100%;
        width:16%;
        margin:0 1%;
    }

    .navBarItem:hover{
        background: #7d3990;
        color:#fff;
    }

    .active{
        color:#7d3990;
        font-size:18px;
    }
</style>