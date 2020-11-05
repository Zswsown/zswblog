<template>
    <div class="blogList">
        <blog-item v-for="(item,index) in blogList"
                   :key="index"
                   :blog-item="item"></blog-item>
    </div>
</template>

<script>
    import BlogItem from './blogItem/BlogItem';
    // const BlogItem=()=>import("./blogItem/BlogItem");
  export default {
    name: "BlogList",
    components:{
      BlogItem,

    },
    props:{
      blogList: {
        type: Array,
        default() {
          return []
        }
      }
    },

  }
</script>

<style scoped>
    .blogList{
        /*height: 864px;*/
        /*width: 1368px;*/
        width: 100%;
        padding:1px 0;
        /*overflow-y:scroll;*/
        /*overflow-x:hidden;*/

        display: flex;
        flex-direction: column;
    }

    .blogList::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
        scrollbar-arrow-color:#ccc;
    }
    .blogList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.1);
        scrollbar-arrow-color:#fff;
    }
    .blogList::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
</style>