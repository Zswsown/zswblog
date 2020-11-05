<template>
    <li class="messageItem">
        <p>
            <a>@{{messageItem.message_author}}</a>
        </p>
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

        height:20px;
        line-height: 20px;
        font-size:1em;
        margin-bottom: 2px;

    }
</style>