<template>
    <div id="pagination">
        <!--        前一页按钮-->
        <img class="btn-prev" src="../../../assets/images/prev.svg" alt="上一页" @click="setPage(current-1)">
<!--        <input class="btn-prev" type="button" value="<" @click="setPage(current-1)">-->
        <!--        分页器-->
        <pager :total-page="totalPage" :default-current-page="current" @change="pageChange"></pager>
        <!--        后一页按钮-->
        <img class="btn-next" src="../../../assets/images/next.svg" alt="下一页" @click="setPage(current+1)">
<!--        <input class="btn-next" type="button" value=">" @click="setPage(current+1)">-->
    </div>
</template>

<script>
    import Pager from "./Pager";
    // const Pager=()=>import("./Pager");
  export default {
    name: "Pagination",
    components:{
      Pager
    },
    props:{
      // 默认当前页码
      defaultCurrentPage:{
        type:Number,
        default(){
          return 1;
        }
      },
      // 默认每页数据的条数
      defaultPageSize:{
        type:Number,
        default(){
          return 10;
        }
      },
      // 数据的总条数
      total:{
        type:Number,
        default(){
          return 100;
        }
      },
    },
    data(){
      return{
        current:this.defaultCurrentPage
      }
    },
    computed:{
      // 计算数据总页数
      totalPage(){
        return Math.ceil(this.total/this.defaultPageSize);
      }
    },

    methods:{
      // 上一页、下一页按钮被点击时，页码发生改变，且要传出被点击的页码
      setPage(page){
        // 左边越界
        if(page<1)this.current=1;
        // 右边越界
        else if(page>this.totalPage){
          this.current=this.totalPage;
        }
        // 正常情况
        else{
          this.current=page;
        }
        // 发出事件，让外部知道页码改变了
        this.$emit('change',this.current);
      },

      // 接收pager中发出的改变页码事件，并再次发送出去
      pageChange(page){
        this.$emit('change',page);
      }
    }
  }
</script>

<style scoped>
    #pagination{

        display: flex;
        justify-content: center;
        align-items:center;
    }
.btn-prev, .btn-next{
    display: block;
    width:1.5em;
    height:1.5em;
    margin:0 8PX 0 0;
}

    /*.btn-prev:focus, .btn-next:focus{*/
    /*    border:1px solid #d9d9d9;*/
    /*    outline: none;*/
    /*}*/
</style>