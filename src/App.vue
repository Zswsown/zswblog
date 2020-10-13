<template>
  <div id="app">
    <nav-bar class="navBar"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>

  import NavBar from './components/navbar/NavBar'
  export default {

    name: 'App',
    components: {
      NavBar
    }
  }

</script>

<style>
  @import '../src/assets/css/base.css';
  #app{
    height:1080px;
    width:1920px;
    display: flex;
    justify-content:center;
    /*background: #f4f4f4;*/
    background:#ffffff url("assets/images/loginBackground.jpg") no-repeat fixed center;
    background-size:1920px 1080px;
  }
  .navBar{
    position:fixed;
    top:0;
    left:0;
    right:0;

    height:44px;
    width: 80%;

    display: flex;
    justify-content: center;
    align-items:center;
  }
</style>
