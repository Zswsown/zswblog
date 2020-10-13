<template>
    <div class="messageList">
        <div class="h"><h2>留言列表</h2></div>
        <message-item v-for="(item,index) in messageList" :message-item="item" :index="index"></message-item>
    </div>
</template>

<script>
    import MessageItem from './MessageItem';
  export default {
    name: "MessageList",
    components:{
      MessageItem,
    },
    props:{
      messageList:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.messageList{
    background: #ffffff;
}
.h{
    font-weight: 500;
    height:50px;
    line-height:50px;
    width:920px;
    margin:0 auto;
    background:#fff;
    border-bottom:1px solid #eee;
}
</style>