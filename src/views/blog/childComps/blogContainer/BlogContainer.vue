<template>
    <div class="blogContainer">
        <blog-list :blog-list="getCurrentBlogList"></blog-list>
        <pagination :default-page-size="size" :total="getBlogSum" @change="pageChange"></pagination>
    </div>
</template>

<script>
    import BlogList from './BlogList';
    import Pagination from '../../../../components/common/pagination/Pagination';

    import {$get, $post} from "../../../../network/request";
    import {BASE_URL,api} from "../../../../common/const";
    import {chunk} from "../../../../server/common/util";

    export default {
    name: "BlogContainer",
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
        size:9,
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
    methods:{
      getBlogList(){
        $get(BASE_URL+api.SELECT_BLOGS).then(res=>{
          // 得到文章列表
          this.blogList=res.data.result;
          console.log(this.blogList);

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
    .blogContainer{
        width:1060px;
        height:calc(100vh - 60px);
        padding:0 10px;
    }
</style>