<template>
    <div class="replyInfoShow">
        <a class="replyA" :href="messageReplyContent.reply_message_id">
            <span class="replySpan">@{{messageReplyContent.reply_message_author}}</span>
        </a>
        <img class="replyCancle" src="../../../../../assets/images/cancle.svg" alt="取消回复" @click="replyInfoHide">
    </div>
</template>

<script>
  export default {
    name: "ReplyInfoShow",
    props:{
      messageReplyContent:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      // 清除Vuex中要回复留言的数据，则组件ReplyInfoShow会因没有数据而不被渲染
      replyInfoHide(){
        this.$store.commit('cleanMessageReplyContent')
      }
    }
  }
</script>

<style scoped>
    .replyInfoShow{
        height:30px;
        padding: 6px 0;
    }
    .replyA,.replySpan{
        display: inline-block;
        height:18px;
    }
    .replyCancle{
        vertical-align: middle;
        width: 18px;
        height:18px;
        margin:0 2px;
    }
</style>