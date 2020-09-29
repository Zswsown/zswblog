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
    import {$post,$get,$axios} from '../../../network/request'
    import {BASE_URL,api} from "../../../common/const";
    import {format} from "../../../common/utils";

    export default {
    name: "InsertMessage",
      data(){
        return{
          isQuote:false,
          messageContent:'',
          tempMessageContent:'',
          messageAuthor:'',
          messageCreateTime:'',
          messageAuthorEmail:'',
          messageQuoteContent: {},
        }
      },
      props:{
        blogID:String,
      },
      methods:{
        async messageCheck() {
          const _this = this;
          const time = new Date();
          this.messageCreateTime = format(time);
          // console.log(this.$store.state.messageQuoteContentList);
          console.log(this.messageContent);

          // 判断文本框中有没有引用的文本
          if (this.messageContent.indexOf('</blockquote>') >= 0) {
            this.isQuote=true;
            console.log(this.messageContent.split('</blockquote>'));
            let splitArray = this.messageContent.split('</blockquote>');
            this.messageContent = splitArray[splitArray.length - 1];
            // console.log(typeof(this.tempMessageContent));
          }

          $post(BASE_URL + api.INSERT_MESSAGE, {
            blogID: this.blogID,
            messageAuthor: this.messageAuthor,
            messageContent: this.messageContent,
            messageCreateTime: this.messageCreateTime,
            messageAuthorEmail: this.messageAuthorEmail,
          }).then((res) => {
            console.log(res.data.messageID);
            // 添加留言成功
            if (res.data.esg === 'success') {
              // 若有引用，执行添加引用留言的操作
              if(this.isQuote){
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
              else{

                // 刷新操作
                _this.insertMessageSuccess();
              }
            } else {
              // 添加留言失败
              this.$toast.show('留言失败',2000);
            }

            // console.log(this.$store.state.messageQuoteContentList);
            // // 判断文本框中有没有引用的文本
            // if(this.messageContent.indexOf('</blockquote>')!==0){
            //   console.log(this.messageContent.split('</blockquote>'));
            //   let splitArray=this.messageContent.split('</blockquote>');
            //   this.messageContent=splitArray[splitArray.length-1];
            //
            //   // 有引用的留言数据，则将其添加进该以留言message_id为外键的引用留言表quotemessages中
            //   $post(BASE_URL+api.INSERT_QUOTE_MESSAGE,{
            //     messageID:res.data.messageID,
            //     messageQuoteContentList: this.$store.state.messageQuoteContentList,
            //   }).then((res)=>{
            //     _this.insertMessageSuccess();
            //   })
            // }

            // }

          })
        },


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
          this.$store.commit('cleanMessageQuoteContentHtml');
        },

    }
  }
</script>

<style scoped>
.insertMessage{

    height: 544px;
    width:940px;
    background:#fff;
    border-radius: 16px;
    box-shadow: 2px 2px 2px 2px #eee;
}
    .h{
        font-weight: 500;
        height:50px;
        line-height:50px;
        width:920px;
        margin:0 10px;
        background:#fff;
        border-bottom:1px solid #eee;
    }
    label{
        display: block;
        line-height: 30px;
        font-weight:600;
       height:30px;
        padding:1px 0;
    }
    .messageOpenData{
        width:920px;
        margin:0 10px;
    }
    .messageOpenDataFooter{
        width:920px;
        margin:10px 10px;
    }

    input{
        display:inline-block;
        width:300px;
        height:40px;
        padding: 4px;

        border-radius: 6px;
        border:1px solid #ccc;
    }

    input[type="submit"]{
        display:inline-block;
        width:100px;
        height:40px;

        border-radius: 6px;
        border:1px solid #ccc;
        background: #7d3990;
        color: #fff;
    }

    textarea{
        border-radius: 6px;
        width: 920px;
        resize:none;
        padding: 4px;
        border:1px solid #ccc;
    }
</style>