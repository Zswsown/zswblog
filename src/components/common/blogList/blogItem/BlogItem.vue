<template>
<!--    @click="getBlogInfo"-->
    <div class="blogItem">
        <div class="blogTitle">{{blogItem.blog_title}}</div>
        <div class="blogContent">{{blogItem.blog_text_content}}</div>
        <blog-footer :blog-create-time="getBlogCreateTime" :blog-item="blogItem"></blog-footer>
    </div>
</template>

<script>
    import {format} from "../../../../common/utils";
    import BlogFooter from "./blogItemFooter/BlogItemFooter";
    // const BlogFooter=()=>import("./blogItemFooter/BlogItemFooter");
  export default {
    name: "BlogItem",
    components:{
      BlogFooter
    },
    props:{
      blogItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },

    computed:{
      // 因为从数据库中取出的数据是没有保留原来插入数据库时的时间戳的格式，所以得重新格式化下
      getBlogCreateTime(){
        return format(this.blogItem.blog_createtime);
      }
    },
    methods:{
      // getBlogInfo(){
      //   this.$router.replace('/manage/blogInfo/'+this.blogItem.blog_id);
      // },

    }
  }
</script>

<style scoped>
    .blogItem{
        /*height:90px;*/
        margin-bottom:20px;
        /*width:1340px;*/
        /*width: 100%;*/
        width: calc(100% - 20px);
        /*background: rgba(255,255,255,.8);*/
        background: #ffffff;
        border-radius:10px;
        /*box-shadow: 2px 2px 2px 2px #eeeeee;*/
        padding: 4px 10px;
        border:2px solid transparent;
    }
    .blogItem:hover{
        border:2px solid #7d3990;
    }
    .blogTitle{
        /*height:20px;*/
        width: 100%;


        /*line-height:20px;*/
        font-weight:600;
        margin-bottom: 6px;
    }
    .blogContent{
        /*height:48px;*/
        /*line-height: 16px;*/
        width: calc(100% - 4px);
        /*background: #42b983;*/
        margin-bottom: 6px;
        font-size: 0.78em;

        /*省略号*/
        overflow:hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient: vertical;
    }

</style>