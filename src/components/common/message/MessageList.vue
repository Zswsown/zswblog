<template>
    <div class="messageList">
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

</style>