<template>
    <div class="blogItem" @click="itemClick">
        <div class="blogTitle">{{blogItem.blog_title}}</div>
        <div class="blogContent">
            <p>{{blogItem.blog_text_content}}</p>
        </div>
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
        this.$router.push('/blogInfo/'+this.blogItem.blog_id);
      }
    }
  }
</script>

<style scoped>
    .blogItem{
        margin-bottom:20px;
        /*width:1020px;*/
        width:100%;
        background: #fff;
        border-radius:20px;
        padding: 4px 0;
        /*box-shadow: 2px 2px 2px 2px #eeeeee;*/
        border:2px solid transparent;
    }
    .blogItem:hover{
        border:2px solid #7d3990;
    }
    .blogTitle{
        margin-bottom: 10px;
        /*width:1000px;*/
        width: calc(100% - 20px);
        background: #fff;
        border-radius:20px 20px 0 0;
        padding:0 10px;


        font-size: 1em;
        /*line-height:18px;*/
        font-weight:600;
    }
    .blogContent{
        /*height:48px;*/
        margin-bottom: 10px;
        font-size: 0.89em;
        /*background: #42b983;*/
        padding:0 10px;
        vertical-align: middle;
        /*省略号*/
        overflow:hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient: vertical;
    }
    .blogContent p{
        margin: 0;
    }

    .blogInfo{

        /*width:1000px;*/
        width: calc(100% - 20px);
        margin-bottom: 6px;
        /*background: yellow;*/
        border-radius:0 0 20px 20px;
        padding:0 10px 6px 10px;

        font-size:.78em;
    }
</style>