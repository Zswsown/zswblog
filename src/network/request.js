import axios from 'axios'
import {localStorage,timeStorage} from "../common/storage";
import router from "../router";
import store from "../store";

axios.defaults.withCredentials=true;
axios.defaults.headers.common['Authorization'] = 'Bearer '+timeStorage.getItem("token");

// 添加请求拦截器
axios.interceptors.request.use(config=>{
    if(localStorage.getItem("token")){
      config.headers.common['Authorization']='Bearer '+timeStorage.getItem("token");
    }

    console.log(config);
    return config;
  },err=>{
    return new Promise.reject(err);
  }
)

// 添加响应拦截器
axios.interceptors.response.use(response => {
    // console.log(response);
    console.log(response);
    if(response){
      switch(response.status){
        case 200:
          if (!(response.data.token==undefined)){
            store.commit("setToken",{
              token:response.data.token,
              expriesIn:response.data.expriesIn
            });
            store.commit('login');
            console.log(111);
            router.replace('/manage/blogManage');
          }
          break;
      }
    }
    return response;
  },
  error => {
    console.log(error)
    // console.log(error.response)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit('removeToken');
          router.replace('/login');
          break;
      }
    }
    // return Promise.reject(error.response.data)
    return Promise.reject(error)
  });

export function $get(url,config){
  return axios.get(url,config)
}

export function $post(url,data){
  return axios.post(url,data)
}

export function $axios(config){
  return axios(config);
}

