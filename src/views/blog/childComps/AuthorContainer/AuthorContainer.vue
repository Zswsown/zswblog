<template>
    <div id="authorContainer">
        <div class="navbar">
            <div class="title">关于</div>
            <div class="management"></div>
        </div>
        <div class="authorImg">
            <img src="../../../../../../zswblog/src/assets/images/Zswsown.jpg" alt="">
        </div>
        <info-container class="infoContainer"
                        :blog-sum="getBlogSum"
                        :message-sum="messageSum"
                        :watch-sum="watchSum"></info-container>
    </div>
</template>

<script>
    import InfoContainer from "./InfoContainer";
    // const InfoContainer=()=>import("./InfoContainer");

    import {$get, $post} from "../../../../network/request";
    import {api, BASE_URL} from "../../../../common/const";

  export default {
    name: "AuthorContainer",
    components:{
      InfoContainer,
    },
    data(){
      return{
        blogSum:0,
        messageSum:0,
        watchSum:0,
      }
    },
    computed:{
      getBlogSum(){
        return this.blogSum;
      },
      getMessageSum(){
        return this.messageSum;
      },
      getWatchSum(){
        return this.watchSum;
      }
    },
    created() {
      this.getBlogList();
      this.getMessageList();
      this.getWatchInfo();
    },
    methods:{
      getBlogList(){
        $get(BASE_URL+api.SELECT_BLOGS).then(res=>{
          // 得到文章列表
          this.blogSum=res.data.result.length;
          // console.log(this.blogSum);
        })
      },
      getMessageList(){
        $get(BASE_URL+api.SELECT_MESSAGES).then(res=>{
          this.messageSum=res.data.result.length;
          // console.log(this.messageSum);
        })
      },
      getWatchInfo(){
        $get(BASE_URL+api.SELECT_WATCH_SUM).then((res)=>{
          // console.log(this.watchSum);
          this.watchSum=res.data.result;
        })
      }
    }
  }
</script>

<style scoped>
    #authorContainer{
        width:460px;
        /*height:338px;*/
        padding:10px;
        background:#fff;
        margin-top: 10px;
        border-radius:20px;
        box-shadow: 2px 2px 2px 2px #eeeeee;
        display: flex;
        flex-direction:column;
    }
    .title{
        font-size:1em;
        line-height: 18px;
        font-weight: 700;
        padding-bottom: 20px;
    }
    .authorImg{
        display:flex;
        justify-content: center;
    }

    .authorImg img{
        height:140px;
        width:140px;
        margin: 10px 0;
        border-radius: 10px;
    }
    /*.infoContainer{*/
    /*    flex:1;*/
    /*}*/
</style>