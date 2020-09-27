<template>
    <div class="messageContainer">
        <div class="messageNavbar">
            <div class="title">留言列表</div>
            <div class="insertMessage">
                <img @mouseenter="mouseenter"
                     @mouseleave="mouseleave"
                     src="../../../../../../zswblog/src/assets/images/message.svg" alt="">
            </div>
        </div>
        <message-item></message-item>
        <message-item></message-item>
        <message-item></message-item>
        <message-item></message-item>
        <message-item></message-item>
        <message-item></message-item>
        <message-item></message-item>

    </div>
</template>

<script>
    import MessageItem from "./MessageItem";
  export default {
    name: "MessageContainer",
    components:{
      MessageItem
    },
    data(){
      return{
        isMessageIconTapShow:false
      }
    },
    methods:{
      mouseenter(){
        this.isMessageIconTapShow=true;
      },
      mouseleave(){
        this.isMessageIconTapShow=false;
      }
    }
  }
</script>

<style scoped>
    .messageContainer{
        flex:1;
        padding: 10px;
        border-radius:20px;
        background: #fff;
        box-shadow: 2px 2px 2px 2px #eeeeee;
    }
    .messageNavbar{
        display: flex;
        justify-content:space-between;
        align-items: center;
    }

    .insertMessage img{
        width: 24px;
        height:24px;
    }
    .title{
        font-size:18px;
        line-height: 18px;
        font-weight: 700;
        margin-bottom:4px;
    }
</style>