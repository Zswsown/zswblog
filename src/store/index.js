import Vue from 'vue';
import Vuex from 'vuex';

// 1.安装Vuex
Vue.use(Vuex);

// 声明state
const state={
  isLogin:false,
  // 是否是回复
  isReply:false,
  // 是否是引用
  isQuote:false,

  // 引用的留言信息
  messageQuoteContent:{
    quote_message_id:-1,
    quote_message_author:'',
    quote_message_content:'',
  },
  // 引用留言信息列表
  messageQuoteContentList:[],

  // 回复的留言信息
  messageReplyContent:{
    // 保留回复的留言的id，便于在回显时用该id做a标签的href="#id"直接定位到被回复留言的位置（被回复留言的标签id为插进数据库中的id）
    reply_message_id:-1,
    reply_message_author:'',
  }
}

// 声明mutation
const mutations={
  // 登录
  login(state,payload){
    state.isLogin=true;
  },
  // 退出登录
  loginOut(state,payload){
    state.isLogin=false;
  },

  // 设置引用状态
  setQuoteState(state){
    state.isQuote=true;
  },

  // 将引用的信息添加进引用留言列表
  getMessageQuoteContentHtml(state,payload){
    // 保证被每个留言最多只能被引用一次
    if(state.messageQuoteContentList.find(item=>item.quote_message_id===payload.quote_message_id)===undefined){
      state.messageQuoteContent=payload;
      state.messageQuoteContentList.push(state.messageQuoteContent);
      // console.log(state.messageQuoteContentList);
    }
  },

  // 当引用的留言后面的取消按钮被点击时，清除掉该引用留言
  cleanMessageQuoteContent(state,payload){
    state.messageQuoteContentList.splice(payload,1);
    if(state.messageQuoteContentList.length===0){
      state.isQuote=false;
    }
  },

  // 清除引用留言列表的信息
  cleanMessageQuoteContentHtml(state){
    state.messageQuoteContentList=[]
  },

  // 设置回复状态
  setReplyState(state){
    state.isReply=true;
  },

  // 获取被回复的留言的信息
  getMessageReplyContentHtml(state,payload){
    state.messageReplyContent=payload;
  },

  // 清除被回复的留言的信息
  cleanMessageReplyContent(state){
    state.messageReplyContent={
      reply_message_id:-1,
      reply_message_author:'',
    };
    state.isReply=false;
  },

  cleanAllState(context){
    state.isReply=false;
    state.isQuote=false;
    state.messageQuoteContentList=[];
    state.messageReplyContent={
      reply_message_id:-1,
      reply_message_author:'',
    };
  }
}

// 声明action
const actions={

}

// 声明getter
const getters={

}

// 2.创建store对象
const store =new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

// 3.挂载到Vue实例上
export default store
