import axios from 'axios'
axios.defaults.withCredentials=true;

export function $get(url,config){
  return axios.get(url,config)
}

export function $post(url,data){
  return axios.post(url,data)
}

export function $axios(config){
  return axios(config);
}