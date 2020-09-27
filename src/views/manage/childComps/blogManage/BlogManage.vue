<template>
    <div class="blogManager">
        <blog-list :blog-list="blogList" class="blogList"></blog-list>
    </div>
</template>

<script>
    import {$get} from '../../../../network/request'
    import BlogList from "../../../../components/common/blogList/BlogList";
  export default {
    name: "BlogManage",
    components:{
      BlogList
    },
    data(){
      return{
        BASE_URL:'http://localhost:3000/api/getBlogList',
        blogList:[]
      }
    },
    created() {
      this.getBlogList();
    },
    mounted() {
      // 清空博客列表
      this.blogList=[];
      // 再次发送请求，请求文章数据，刷新页面
      this.$bus.$on('refresh',this.getBlogList);
    },
    methods:{
      getBlogList(){
        $get(this.BASE_URL).then(res=>{
          this.blogList=res.data.result;
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
    .blogManager{
        height:100%;
        width:100%;
    }

    .blogList{
        height: 80%;
        background: #fff;
        width: 100%;
        border-radius: 10px;
        box-shadow: 2px 2px 2px 2px #eeeeee;
    }
</style>