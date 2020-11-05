<template>
    <div class="blogManager">
        <blog-list :blog-list="getCurrentBlogList" class="blogList"></blog-list>
        <pagination :default-page-size="size" :total="getBlogSum" @change="pageChange"></pagination>
    </div>
</template>

<script>
    import {$get} from '../../../../network/request';
    import {chunk} from "../../../../server/common/util";

    import BlogList from "../../../../components/common/blogList/BlogList";
    import Pagination from "../../../../components/common/pagination/Pagination";
    // const BlogList=()=>import("../../../../components/common/blogList/BlogList");
    // const Pagination=()=>import("../../../../components/common/pagination/Pagination");
    const SERVER=require('../../../../server/common/const');
  export default {
    name: "BlogManage",
    components:{
      Pagination,
      BlogList
    },
    data(){
      return{
        // 总的文章列表
        blogList:[],
        // 当前页码对应的文章列表
        currentBlogList:[],
        // 文章总数
        blogSum:0,
        // 限制每页文章显示的条数
        size:8,
      }
    },
    computed:{
      // 得到当前文章的总数，传给分页器，方便显示页数
      getBlogSum(){
        return this.blogSum;
      },
      // 得到当前页码对应的文章列表
      getCurrentBlogList(){
        return this.currentBlogList;
      }
    },
    created() {
      // 得到文章列表
      this.getBlogList();
    },
    activated() {
      // 当添加文章成功后，会跳转到该页面，但是因为blogManage是博客管理的默认页面，已经被created过了，所以只能在活跃后重新请求一次数据
      this.getBlogList();
      // console.log('回来了');
    },
    deactivated() {
      // console.log('离开了');
    },
    watch:{
      blogList:function (newValue,oldValue) {
        // console.log(newValue);
      }
    },
    mounted() {
      // 清空博客列表
      this.blogList=[];
      // 再次发送请求，请求文章数据，刷新页面
      this.$bus.$on('refresh',this.getBlogList);
    },
    methods:{
      getBlogList(){
        $get(SERVER.BASE_URL+SERVER.api.SELECT_BLOGS).then(res=>{
          // 得到文章列表
          this.blogList=res.data.result;
          // console.log(this.blogList);

          this.blogSum=this.blogList.length;
          // 将文章列表分割成想要尺寸的数组
          this.blogList=chunk(this.blogList,this.size);
          // 默认当前页面为切割好的二维数组的第一个一维数组
          this.currentBlogList=this.blogList[0];
        })
      },

      // 当点击分页器时，页码变化时切换不同页码对应的文章列表
      pageChange(page){
        this.currentBlogList=this.blogList[page-1];
      }
    }
  }
</script>

<style scoped>
    .blogManager{
        /*width:1368px;*/
        width: 100%;
    }

    .blogList{
        /*height: 864px;*/
        /*width: 1368px;*/
        width: 100%;
        border-radius: 10px;
        background: rgba(255,255,255,0);
    }

    .blogManager::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
        scrollbar-arrow-color:#ccc;
    }
    .blogManager::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.1);
        scrollbar-arrow-color:#fff;
    }
    .blogManager::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
</style>