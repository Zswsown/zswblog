<template>
    <div class="insertMessage">
        <div class="h"><h2>我要发表看法</h2></div>
        <div class="messageForm">
            <form action="#" method="post" @submit.prevent="messageCheck">
                <div class="messageOpenData">
                    <div class="messageOpenText">
                        <p>
                            <label for="messageText" >您的留言</label>
                        </p>
                        <reply-info-show v-show="relayInfoShow"
                                         :message-reply-content="this.$store.state.messageReplyContent"></reply-info-show>
                        <quote-info-list-show :message-quote-content-list="this.$store.state.messageQuoteContentList"></quote-info-list-show>
                        <p>
                            <textarea id="messageText" cols="50" rows="10" required v-model="messageContent"></textarea>
                        </p>
                    </div>
                    <div class="messageFormName">
                        <p>
                            <label for="messageAuthor">您的大名</label>
                        </p>
                        <p>
                            <input type="text" id="messageAuthor" size="30" required placeholder="请输入您的大名(必填)" v-model="messageAuthor">
                        </p>
                    </div>
                    <div class="messageFormEmail">
                        <p>
                            <label for="messageAuthorEmail">您的邮箱</label>
                        </p>
                        <p>
                            <input type="email" id="messageAuthorEmail" size="30" placeholder="请输入您的邮箱(可填)" v-model="messageAuthorEmail">
                        </p>
                    </div>
                </div>
                <div class="messageOpenDataFooter">
                    <p>
                        <input type="submit" id="post" value="发表">
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {$post,$get,$axios} from '../../../../network/request'
    import {BASE_URL,api} from "../../../../common/const";
    import {format} from "../../../../common/utils";

    import ReplyInfoShow from "./reply/ReplyInfoShow";
    import QuoteInfoListShow from "./quote/QuoteInfoListShow";
    // const ReplyInfoShow=()=>import('./reply/ReplyInfoShow');
    // const QuoteInfoListShow=()=>import('./quote/QuoteInfoListShow');

    export default {
    name: "InsertMessage",
      components:{
        ReplyInfoShow,
        QuoteInfoListShow,
      },
      data(){
        return{
          //留言内容
          messageContent:'',
          // 留言作者
          messageAuthor:'',
          // 留言创建的时间
          messageCreateTime:'',
          // 留言作者的邮箱地址
          messageAuthorEmail:'',
          // 留言所引用的留言内容
          messageQuoteContent: {},
          // 留言所引用的留言内容所组成的列表
          messageQuoteContentList: [],
        }
      },
      props:{
        blogID:String,
        blogTitle: String,
      },
      watch:{
        blogTitle:function (newValue,oldValue) {
            this.blogTitle=newValue;
        }
      },
      created() {
        console.log(this.blogID);
        console.log(this.blogTitle);
      },
      computed:{
        // 计算属性监控vuex中的回复留言的数据是否为空，不为空的话证明其点了回复，则显示@的内容，如果为空则不显示
        relayInfoShow(){
          if(this.$store.state.messageReplyContent.reply_message_author===""){
            return false;
          }
          return true;
        }
      },
      methods:{
        async messageCheck() {
          const _this = this;
          const time = new Date();
          this.messageCreateTime = format(time);

          $post(BASE_URL + api.INSERT_MESSAGE, {
            blogID: this.blogID,
            blogTitle:this.blogTitle,
            messageAuthor: this.messageAuthor,
            messageContent: this.messageContent,
            messageCreateTime: this.messageCreateTime,
            messageAuthorEmail: this.messageAuthorEmail,
          }).then((res) => {
            console.log(res.data.messageID);
            // 添加留言成功
            if (res.data.esg === 'success') {
              // 判断有没有引用，执行添加引用留言的操作
              if(this.$store.state.isQuote){
                // 有引用的留言数据，则将其添加进该以留言message_id为外键的引用留言表quotemessages中
                $post(BASE_URL + api.INSERT_QUOTE_MESSAGE, {
                  // 记得要放该留言的id
                  messageID: res.data.messageID,
                  messageQuoteContentList: this.$store.state.messageQuoteContentList,
                }).then((res) => {
                  if(!(res.data.id==null)){
                    // 刷新操作
                    console.log(res.data.id);
                    _this.insertMessageSuccess();
                  }
                })
              }

              //判断有没有要回复的内容
              else if(this.$store.state.isReply){
                $post(BASE_URL+api.INSERT_REPLY_MESSAGE,{
                  messageID:res.data.messageID,
                  replyMessageID:this.$store.state.messageReplyContent.reply_message_id,
                  replyMessageAuthor:this.$store.state.messageReplyContent.reply_message_author
                }).then((res)=>{
                  if(!(res.data.id==null)){
                    // 刷新操作
                    console.log(res.data.id);
                    _this.insertMessageSuccess();
                  }
                })
              }

              else{
                // 刷新操作
                _this.insertMessageSuccess();
              }
            } else {
              // 添加留言失败
              this.$toast.show('留言失败',2000);
            }
          })
        },

        // 添加留言成功后执行的操作
        insertMessageSuccess(){
          console.log('我被调用了');
          // 留言成功，提示成功信息
          this.$toast.show('留言成功',2000);
          // 通知外面执行添加留言操作后，要重新渲染页面
          this.$emit('insertMessageClick');
          this.messageAuthor='';
          this.messageContent='';
          this.messageAuthorEmail='';

          // 清空引用的留言的数据
          this.$store.commit('cleanAllState');
        },

    }
  }
</script>

<style scoped>
.insertMessage{

    /*height: 544px;*/
    /*width:940px;*/
    width: 100%;
    background:#fff;
    border-radius: 16px;
    box-shadow: 2px 2px 2px 2px #eee;
}
    h2,label,p{
        margin: 0;
        padding: 0;
        font-size: 1.1em;
        line-height: 1.1em;
    }

    .h{
        padding: 10px 0;
        font-weight: 500;
        /*height:50px;*/
        /*line-height:50px;*/
        width:calc(100% - 20px);
        margin:0 10px;
        background:#fff;
        border-bottom:1px solid #eee;
    }
    label{
        display: block;
        font-size: 1em;
        line-height: 1em;
        font-weight:600;
       /*height:30px;*/
        padding:10px 0;
    }
    .messageOpenData{
        width:calc(100% - 20px);
        margin:0 10px;
    }
    .messageOpenDataFooter{
        width:calc(100% - 20px);
        margin:10px 10px 100px 10px;
    }

    input[type="text"],input[type="email"]{
        display:inline-block;
        width:14em;
        height:2em;
        padding: 4px;

        border-radius: 6px;
        border:1px solid #ccc;
    }

    input[type="submit"]{
        display:inline-block;
        /*width:100px;*/
        /*height:40px;*/

        padding: 6px;
        border-radius: 6px;
        border:1px solid #ccc;
        background: #7d3990;
        color: #fff;
    }

    textarea{
        border-radius: 6px;
        width:calc(100% - 20px);
        resize:none;
        padding: 4px;
        border:1px solid #ccc;
    }
</style>