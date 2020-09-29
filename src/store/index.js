import Vue from 'vue';
import Vuex from 'vuex';

// 1.安装Vuex
Vue.use(Vuex);

// 声明state
const state={
  isLogin:false,
  messageQuoteContent:{
    quote_message_author:'',
    quote_message_content:'',
  },
  messageQuoteContentList:[]
}

// 声明mutation
const mutations={
  login(state,payload){
    state.isLogin=true;
  },
  loginOut(state,payload){
    state.isLogin=false;
  },
  getMessageQuoteContentHtml(state,payload){
    state.messageQuoteContent=payload;
    state.messageQuoteContentList.push(state.messageQuoteContent);
    console.log(state.messageQuoteContentList);
  },
  cleanMessageQuoteContentHtml(state){
    state.messageQuoteContentList=[]
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
