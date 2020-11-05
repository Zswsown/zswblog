<template>
    <div class="messageQuoteContentList">
        <message-quote-content v-for="(item,index) in messageQuoteContentList"
                               :message-quote-content="item"></message-quote-content>
    </div>
</template>

<script>
    import MessageQuoteContent from "./MessageQuoteContent";
    // const MessageQuoteContent=()=>import("./MessageQuoteContent");
  export default {
    name: "MessageQuoteContentList",
    components:{
      MessageQuoteContent
    },
    props:{
      messageQuoteContentList:{
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