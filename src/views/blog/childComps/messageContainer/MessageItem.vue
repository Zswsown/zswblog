<template>
    <li class="messageItem">
        <a>@{{messageItem.message_author}}</a>
    </li>
</template>

<script>
  export default {
    name: "MessageItem",
    props:{
      messageItem:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
    .messageItem{
        display: block;
        width: 100%;
        margin-top:5px;
        height:20px;
        line-height: 20px;
        font-size:16px;
        margin-bottom: 8px;
    }
</style>