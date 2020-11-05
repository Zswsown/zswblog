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
    },
    mounted() {
      window.onresize=()=>{
        if(this.$route.path==='/manage/messageManage'){
          this.resizeTdHeight();
        }
      }
    },
    methods:{
      resizeTdHeight(){
        this.$bus.$emit("resizeTdHeight");
      },
      debounce(func,delay=200){
        let timer=null;
        return function(...args){
          if(timer)clearTimeout(timer);
          timer=setTimeout(()=>{
            func.apply(this,args)
          },delay);
        }
      }
    }
  }

</script>

<style>
  @import "./assets/css/normalize.css";
  #app{
    margin: 0;
    padding: 0;
    /*height:1080px;*/
    height:100%;
    /*width:1920px;*/
    display: flex;
    justify-content:center;
    background: #f4f4f4;
    /*background:#ffffff url("assets/images/loginBackground.jpg") no-repeat fixed center;*/
    background-size:1920px 1080px;
    /*overflow-x: hidden;*/
    overflow-y: auto;
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
