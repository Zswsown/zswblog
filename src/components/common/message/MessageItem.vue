<template>
    <div class="messageItem">
        <div class="messageHeader">
            <p>
            <span>
                <span class="messageAuthor">{{messageItem.message_author}}</span>
                说：
            </span>
            </p>
        </div>
        <message-quote-content-list :message-quote-content-list="messageQuoteContentList"></message-quote-content-list>
        <div class="messageContent">
            <p>{{messageItem.message_content}}</p>
        </div>
        <div class="messageFooter">
            <p>
                <abbr :title="getMessageCreateTime">{{getMessageCreateTime}}</abbr>
                |
                <a href="#messageText" @click="getMessageQuoteContentHtml">引用</a>
            </p>
        </div>
    </div>
</template>

<script>
    import {format} from "../../../common/utils";
    import MessageQuoteContentList from "./MessageQuoteContentList";
    import {$post} from "../../../network/request";
    import {api, BASE_URL} from "../../../common/const";

    export default {
    name: "MessageItem",
    components:{
      MessageQuoteContentList,
    },
    props:{
      messageItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
      data(){
        return{
          messageQuoteContentList:[]
        }
      },
      created(){
        this.getMessageQuoteContentList(this.messageItem.message_id);
      },
      computed:{
        getMessageCreateTime(){
          return format(this.messageItem.message_createtime);
        }
      },
      methods:{
        getMessageQuoteContentHtml(){
          // 将被引用的留言数据拼接好,放入文本框
          let messageItemHtml="<blockquote>\n\n<pre>引用"+this.messageItem.message_author+"的留言：</pre>\n\n<p>"
            +this.messageItem.message_content+"</p>\n\n</blockquote>\n\n";
          let messageText=document.getElementById('messageText').value;
          document.getElementById('messageText').value=messageItemHtml+messageText;

          // 将被引用的留言数据发送给要插入数据库的留言数据
          let messageQuoteContent={
            quote_message_author:this.messageItem.message_author,
            quote_message_content: this.messageItem.message_content,
          }
          console.log(messageQuoteContent);
          this.$store.commit('getMessageQuoteContentHtml',messageQuoteContent);
        },

        // 得到评论中引用的留言数据
        getMessageQuoteContentList(id){
          $post(BASE_URL+api.SELECT_QUOTE_MESSAGE,{
            messageID:id
          }).then((res)=>{
            this.messageQuoteContentList=res.data.quoteMessages;
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

    .messageFooter p{
        margin:16px 0 0 750px;
        font-size:14px;
    }
</style>