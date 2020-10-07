<template>
    <div class="messageItem">
        <div class="messageHeader">
            <p>
            <span :id="messageItem.message_id">
                #{{index+1}}楼
                <span class="messageAuthor">{{messageItem.message_author}}</span>
                说：
            </span>
            </p>
        </div>
        <!--        引用的评论的列表-->
        <message-quote-content-list :message-quote-content-list="messageQuoteContentList"></message-quote-content-list>
        <div class="messageContent">
            <!--            回复的评论的列表-->
            <message-reply-content class="messageReplyContent" :reply-message-content="messageReplyContent"></message-reply-content>
            <!--            评论的内容-->
            <p>
                {{messageItem.message_content}}
            </p>
        </div>
        <div class="messageFooter">
            <p>
                <abbr :title="getMessageCreateTime">{{getMessageCreateTime}}</abbr>
                |
                <a href="#messageText" @click="getMessageQuoteContentHtml">引用</a>
                |
                <a href="#messageText" @click="getMessageReplyContentHtml">回复</a>
            </p>
        </div>
    </div>
</template>

<script>
    import {format} from "../../../common/utils";
    import {$post} from "../../../network/request";
    import {api, BASE_URL} from "../../../common/const";

    import MessageReplyContent from "./MessageReplyContent";
    import MessageQuoteContentList from "./MessageQuoteContentList";

    export default {
    name: "MessageItem",
    components:{
      MessageReplyContent,
      MessageQuoteContentList,
    },
    props:{
      messageItem:{
        type:Object,
        default(){
          return {}
        }
      },
      index:{
        type:Number,
        default(){
          return -1;
        }
      }
    },
      data(){
        return{
          messageQuoteContentList:[],
          messageReplyContent:{},
        }
      },
      created(){
        this.getMessageQuoteContentList(this.messageItem.message_id);
        this.getMessageReplyContent(this.messageItem.message_id);
      },
      computed:{
        getMessageCreateTime(){
          return format(this.messageItem.message_createtime);
        }
      },
      methods:{
        getMessageQuoteContentHtml(){
          // // 将被引用的留言数据拼接好,放入文本框
          // let messageItemHtml="<blockquote>\n\n<pre>引用"+this.messageItem.message_author+"的留言：</pre>\n\n<p>"
          //   +this.messageItem.message_content+"</p>\n\n</blockquote>\n\n";
          // let messageText=document.getElementById('messageText').value;
          // document.getElementById('messageText').value=messageItemHtml+messageText;

          // 将被引用的留言数据发送给要插入数据库的留言数据
          let messageQuoteContent={
            quote_message_id:this.messageItem.message_id,
            quote_message_author:this.messageItem.message_author,
            quote_message_content: this.messageItem.message_content,
          }
          this.$store.commit('getMessageQuoteContentHtml',messageQuoteContent);
          this.$store.commit('setQuoteState');
        },

        // 得到评论中引用的留言数据
        getMessageQuoteContentList(id){
          $post(BASE_URL+api.SELECT_QUOTE_MESSAGE,{
            messageID:id
          }).then((res)=>{
            this.messageQuoteContentList=res.data.quoteMessages;
            // console.log(this.messageQuoteContentList);
          })
        },

        // 得到评论中回复的留言数据
        getMessageReplyContentHtml(){
          let messageReplyContent={
            reply_message_id:this.messageItem.message_id,
            reply_message_author:this.messageItem.message_author,
          };
          // console.log(messageReplyContent);
          this.$store.commit('getMessageReplyContentHtml',messageReplyContent)
          this.$store.commit('setReplyState');
        },

        // 得到评论中的回复的留言数据
        getMessageReplyContent(id){
          $post(BASE_URL+api.SELECT_REPLY_MESSAGE,{
            messageID:id
          }).then((res)=>{
            this.messageReplyContent=res.data.replyMessage[0];
            // console.log(this.messageReplyContent);
            // console.log(this.messageReplyContent == null);
          })
        }
      }
  }
</script>

<style scoped>
.messageItem{
    width:940px;
    margin:0 auto;
    padding-bottom:10px;
    border-bottom:1px dashed #ccc;
}
span{
    font-weight: 700;
}
.messageAuthor{
    font-weight:700;
    font-size: 18px;
}
p{
    margin:16px 0 0 0;
}
.messageContent p{
    /*缩进两字符*/
    text-indent:2em;
}

.messageReplyContent{
    /*缩进两字符*/
    margin:16px 0 0 0;
    text-indent:2em;
}

    .messageFooter p{
        margin:16px 0 0 730px;
        font-size:14px;
    }
</style>