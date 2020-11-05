<template>
    <div class="blogItemInfo">
        <div class="time">{{blogCreateTime}}</div>
<!--        <div class="watch">-->
<!--            <img src="../../../../../assets/images/eye.svg" alt="">-->
<!--            <span>1</span>-->
<!--        </div>-->
    </div>
</template>

<script>
  export default {
    name: "BlogItemInfo",
    props:{
      blogCreateTime:{
        type:String,
        default(){
          return '1990-01-01 08:00:00'
        }
      }
    },
  }
</script>

<style scoped>
.blogItemInfo{
    margin:0 2px;
    display:flex;

}

.time{
    font-size:0.78em;
}

.watch{
    display: flex;
    align-items: center;
}
    .watch img{
        width: 14px;
        height:14px;
        margin-left:4px;
        vertical-align: middle;
    }
    .watch span{

        font-size: 0.78em;
    }
</style>