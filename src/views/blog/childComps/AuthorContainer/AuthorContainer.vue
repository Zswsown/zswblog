<template>
    <div id="authorContainer">
        <div class="navbar">
            <div class="title">关于</div>
            <div class="management"></div>
        </div>
        <div class="authorImg">
            <img src="../../../../../../zswblog/src/assets/images/Zswsown.png" alt="">
        </div>
        <info-container class="infoContainer"></info-container>
    </div>
</template>

<script>
    import InfoContainer from "./InfoContainer";
  export default {
    name: "AuthorContainer",
    components:{
      InfoContainer,
    }
  }
</script>

<style scoped>
    #authorContainer{
        width:100%;
        height:40%;
        padding:10px;
        background:#fff;
        margin:10px 0;
        border-radius:20px;
        box-shadow: 2px 2px 2px 2px #eeeeee;
        display: flex;
        flex-direction:column;
    }
    .title{
        font-size:18px;
        line-height: 18px;
        font-weight: 700;
    }
    .authorImg{
        display:flex;
        justify-content: center;
    }

    .authorImg img{
        height:120px;
        width:120px;
        margin: 10px 0;
        border-radius: 10px;
    }
    .infoContainer{
        flex:1;
    }
</style>