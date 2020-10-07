<!--回显的回复留言的信息-->
<template>
    <div class="messageReplyContent" v-if="isShow">
        <p>
            <a :href="'#'+replyMessageContent.reply_id">@{{replyMessageContent.reply_author}}</a>
        </p>
    </div>
</template>

<script>
  export default {
    name: "MessageReplyContent",
    props:{
      replyMessageContent:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      // 如果回显的留言中没有需要回复的信息，则该组件不显示
      isShow(){
        if(Object.keys(this.replyMessageContent).length===0){
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>
.messageReplyContent a{
    color:blue;
}
</style>