<template>
    <div class="blogItemBehavior">
        <a class="behavior" @click="glance">查看</a>
        <a class="behavior" @click="remove">删除</a>
        <a class="behavior" @click="edit">编辑</a>
    </div>
</template>

<script>
    const SERVER=require('../../../../../server/common/const');
  import {$post} from "../../../../../network/request";

  export default {
    name: "BlogItemBehavior",
    props:{
      blogItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return{
        BASE_URL:'http://localhost:3000/api/deleteBlog',
      }
    },
    methods:{
      // 编辑
      edit(){
        this.$router.replace('/manage/editAgainManage/'+this.blogItem.blog_id);
      },
      // 查看
      glance(){
        this.$router.replace('/manage/blogInfo/'+this.blogItem.blog_id);
      },
      // 删除
      remove(){
        $post(SERVER.BASE_URL+SERVER.api.DELETE_BLOG,{blog_id:this.blogItem.blog_id})
          .then((res)=>{
            console.log(res);
            // 刷新文章列表的文章数据
            this.$bus.$emit('refresh');
          })
      }
    }
  }
</script>

<style scoped>
.blogItemBehavior{
    display:flex;
    justify-content: space-around;
    align-items:center;
    /*height: 14px;*/
    /*width:160px;*/

    font-size:0.78em;

}
    .behavior{
        font-size: 0.78em;
        margin-right: 10px;
    }

    .behavior:hover{
        color:red;
    }


</style>