<template>
    <div class="messageQuoteContent" v-if="isShow">
        <blockquote>
            <a :href="'#'+messageQuoteContent.quote_message_id">
                引用{{messageQuoteContent.quote_message_author}}的留言：
            </a>
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
    },
    computed:{
      // 若留言中无引用内容，则不显示
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
    a{
        font-weight: 700;
        text-decoration: none;
        color: #333;
    }
    p{
        margin-top:16px;
        /*text-indent: 2em;*/
    }
</style>