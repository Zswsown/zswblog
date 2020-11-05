<template>
    <div id="index">
        <introduce></introduce>
    </div>
</template>

<script>
  import Introduce from "./Introduce";
  // const Introduce=()=>import("./Introduce");
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
        margin-top: 60PX;
        height: calc(100vh - 60PX);
        width:1920px;

        background:#ffffff url("../../assets/images/loginBackground.jpg") no-repeat fixed center;
        background-size: cover;
    }



    @media screen and (max-width:750px){
        #index{
            background-size: 750px 1274px;
            background:#ffffff url("../../assets/images/m_background.jpg") no-repeat fixed center;
        }
    }
</style>