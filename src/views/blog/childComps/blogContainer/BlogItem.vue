<template>
    <div class="blogItem">
        <div class="blogTitle">封装JSONP</div>
        <div class="blogContent">的痕迹萨克的哈数据的哈数据的哈师范沙的痕迹萨克的哈数据的哈数据的哈师范沙发沙发沙发上放沙发的痕迹萨克的哈数据的哈数据的哈师范沙发沙发沙发上放沙发沙发沙发沙发沙发沙发沙发上的痕迹萨克的哈数据的哈数据的哈师范沙发沙发沙发上放沙发沙发沙发沙发</div>
        <div class="blogInfo">2020-09-20 19:10</div>
    </div>
</template>

<script>
  export default {
    name: "BlogItem"
  }
</script>

<style scoped>
    .blogItem{
        height:90px;
        margin-bottom:10px;
        width:100%;
        background: #fff;
        border-radius:20px;
        box-shadow: 2px 2px 2px 2px #eeeeee;

    }
    .blogItem:hover{
        border:2px solid #7d3990;
    }
    .blogTitle{
        height:20px;
        width: 100%;
        background: #fff;
        border-radius:20px 20px 0 0;
        padding:0 10px;

        font-size: 18px;
        line-height:20px;
        font-weight:600;
    }
    .blogContent{
        height:48px;
        margin-top: 4px;
        line-height: 16px;
        width: 100%;
        /*background: #42b983;*/
        padding:0 10px;

        /*省略号*/
        overflow:hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient: vertical;
    }
    .blogInfo{
        height: 14px;
        width:100%;
        margin-top: 2px;
        /*background: yellow;*/
        border-radius:0 0 20px 20px;
        padding:0 10px;

        font-size:14px;
        line-height:14px;
    }
</style>