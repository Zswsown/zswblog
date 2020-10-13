<template>
    <div id="index">
        <introduce></introduce>
    </div>
</template>

<script>
  import Introduce from "./Introduce";
  export default {
    name: "Index",
    components:{
      Introduce
    },
    data(){
        return{}
    }
  }
</script>

<style scoped>
    #index{
        width:1536px;
        height:100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>