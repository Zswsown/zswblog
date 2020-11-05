<template>
    <div id="navBar">
        <nav-bar-item path="/index">
            <div slot="nav-title">首页</div>
        </nav-bar-item>
        <nav-bar-item path="/blog">
            <div slot="nav-title">博客</div>
        </nav-bar-item>
        <nav-bar-item path="/material">
            <div slot="nav-title">资料</div>
        </nav-bar-item>
        <nav-bar-item path="/manage">
            <div slot="nav-title">我的</div>
        </nav-bar-item>
    </div>
</template>

<script>
    import NavBarItem from './NavBarItem';
    // const NavBarItem=()=>import("./NavBarItem");
  export default {
    name: "NavBar",
    components: {NavBarItem},
  }
</script>

<style scoped>
    #navBar{
        height:44PX;
        width:100%;
        display:flex;
        justify-content: center;
        align-items:center;
        background: #fff;
        z-index: 9;
    }
</style>