<template>
    <div class="infoContainer">
        <info-item class="infoItem">
            <div slot="item-title">文章</div>
            <div slot="item-num">{{blogSum}}</div>
        </info-item>
        <info-item class="infoItem">
            <div slot="item-title">留言</div>
            <div slot="item-num">{{messageSum}}</div>
        </info-item>
        <info-item class="infoItem">
            <div slot="item-title">浏览</div>
            <div slot="item-num">{{watchSum}}</div>
        </info-item>
    </div>
</template>

<script>
    import InfoItem from './InfoItem';
    // const InfoItem=()=>import("./InfoItem");
  export default {
    name: "InfoContainer",
    components:{
      InfoItem,
    },
    props:{
      blogSum:{
        type:Number,
        default(){
          return 0
        }
      },
      messageSum:{
        type:Number,
        default(){
          return 0
        }
      },
      watchSum:{
        type:Number,
        default(){
          return 0
        }
      }
    }
  }
</script>

<style scoped>
    .infoContainer{
        display: flex;
        justify-content:space-between;
        height:120px;
        width:440px;
    }
    .infoItem{
        padding: 20px;
        flex: 30%;
    }
</style>