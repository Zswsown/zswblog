<template>
    <div class="messageList">
        <div class="h"><h2>留言列表</h2></div>
        <message-item v-for="(item,index) in messageList" :message-item="item" :index="index"></message-item>
    </div>
</template>

<script>
    import MessageItem from './MessageItem';
    // const MessageItem=()=>import("./MessageItem");
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
h2{
    font-size: 1.1em;
    line-height:1.1em;
    margin: 0;
    padding: 0;
}

.h{
    padding: 6px 0;
    font-weight: 500;
    /*height:50px;*/
    /*width:920px;*/
    width: calc(100% - 20px);
    margin:0 10px;
    background:#fff;
    border-bottom:1px solid #eee;
}
</style>