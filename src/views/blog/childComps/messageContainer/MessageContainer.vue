<template>
    <div class="messageContainer">
        <div class="messageNavbar">
            <div class="title">留言列表</div>
            <div class="insertMessage">
                <img src="../../../../../../zswblog/src/assets/images/message.svg" alt="">
            </div>
        </div>
        <message-list :message-list="getMessages"></message-list>
    </div>
</template>

<script>
  // const MessageList=()=>import("./MessageList");
    import MessageList from './MessageList';
    import {$get} from '../../../../network/request';
    import {BASE_URL,api} from '../../../../common/const';
    import {chunk} from '../../../../common/utils';
  export default {
    name: "MessageContainer",
    components:{
      MessageList,
    },
    data(){
      return{
        messageList:[],
        currentMessageList:[],
      }
    },
    created() {
      this.getMessageList();
    },
    computed:{
      getMessages(){
        return this.currentMessageList;
      }
    },
    methods:{
      getMessageList(){
        $get(BASE_URL+api.SELECT_MESSAGES).then(res=>{
          this.messageList=res.data.result;
          this.messageList=chunk(this.messageList,20);
          this.currentMessageList=this.messageList[0];
        })
      }
    }
  }
</script>

<style scoped>
    .messageContainer{
        width: 460px;
        height: 600px;
        padding: 10px;
        border-radius:20px;
        background: #fff;
        box-shadow: 2px 2px 2px 2px #eeeeee;
        margin-bottom: 20px;
    }
    .messageNavbar{
        display: flex;
        justify-content:space-between;
        align-items: center;
    }

    .insertMessage img{
        width: 24px;
        height:24px;
    }
    .title{
        font-size:1em;
        line-height: 18px;
        font-weight: 700;
        margin-bottom:4px;
    }
</style>