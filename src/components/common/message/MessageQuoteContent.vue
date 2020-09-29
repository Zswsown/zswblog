<template>
    <div class="messageQuoteContent" v-show="isShow">
        <blockquote>
            <pre>引用 {{messageQuoteContent.quote_message_author}} 的留言：</pre>
            <p>{{messageQuoteContent.quote_message_content}}</p>
        </blockquote>
    </div>
</template>

<script>
  export default {
    name: "MessageQuoteContent",
    props:{
      messageQuoteContent:{
        type:Object,
        default(){
          return {}
        }
      },

      // quoteMessageContent:{
      //   type:String,
      //   default(){
      //     return ''
      //   }
      // },
      // quoteMessageAuthor:{
      //   type:String,
      //   default(){
      //     return ''
      //   }
      // }
    },
    computed:{
      isShow(){
        if(this.messageQuoteContent.quote_message_author.length===0||this.messageQuoteContent.quote_message_author==null){
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>
    .messageQuoteContent{
        padding:10px;
        margin:6px;
        background: rgba(125, 57, 144,.3);
        border-radius: 16px;
    }
    pre{
        font-weight: 700;
    }
    p{
        margin-top:16px;
    }
</style>