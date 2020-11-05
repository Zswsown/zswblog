<template>
    <ul class="messageList">
        <message-item v-for="(item,index) in messageList"
                      :key="index"
                      :message-item="item"></message-item>
    </ul>
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
ul{
    padding: 0;
}
</style>