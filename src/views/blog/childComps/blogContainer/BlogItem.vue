<template>
    <div class="blogItem" @click="itemClick">
        <div class="blogTitle">{{blogItem.blog_title}}</div>
        <div class="blogContent">{{blogItem.blog_text_content}}</div>
        <div class="blogInfo">{{getFomateTime}}</div>
    </div>
</template>

<script>
  import {format} from "../../../../common/utils";

  export default {
    name: "BlogItem",
    props:{
      blogItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      getFomateTime(){
        return format(this.blogItem.blog_createtime);
      }
    },
    methods:{
      itemClick(){
        this.$router.push('/blog/blogItemInfo/'+this.blogItem.blog_id);
      }
    }
  }
</script>

<style scoped>
    .blogItem{
        height:92px;
        margin-bottom:10px;
        width:1020px;
        background: #fff;
        border-radius:20px;
        /*box-shadow: 2px 2px 2px 2px #eeeeee;*/
        border:2px solid transparent;
    }
    .blogItem:hover{
        border:2px solid #7d3990;
    }
    .blogTitle{
        height:20px;
        width:100%;
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
        width:100%;
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