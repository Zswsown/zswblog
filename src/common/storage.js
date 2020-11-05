// 对html5中提供的localStorage和sessionStorage进行封装
export const localStorage={
  // 获取
  getItem(key){
    try{
      let value=window.localStorage.getItem(key);
      if(!value||value===''){
        return null;
      }
      return JSON.parse(value);
    }
    catch(e){
      return null
    }
  },

  // 添加
  setItem(key,value){
    window.localStorage.setItem(key,JSON.stringify(value));
  },

  // 删除
  removeItem(key){
    window.localStorage.removeItem(key);
  },

  // 清除
  clear(){
    window.localStorage.clear()
  },

  // 长度
  length(){
    return window.localStorage.length;
  }
}

export const sessionStorage={
  // 获取
  getItem(key){
    try{
      let value=window.sessionStorage.getItem(key);
      if(value===null||value===undefined||value===''){
        return null;
      }
      return JSON.parse(value);
    }
    catch(e){
      return null
    }
  },

  // 添加
  setItem(key, value) {
    window.sessionStorage.setItem(key,JSON.stringify(value));
  },

  // 删除
  removeItem(key) {
    window.sessionStorage.removeItem(key);
  },

  // 清除
  clear(){
    window.sessionStorage.clear();
  },

  // 长度
  length(){
    return window.localStorage.length;
  }
}

// localStorage定时缓存封装，设置缓存的时间单位为分钟，如果没有设置时间，默认为60分钟
export const timeStorage={
  // 获取
  getItem(key){
    try{
      if(!window.localStorage){
        return null;
      }
      let data=JSON.parse(window.localStorage.getItem(key));
      // 判断设定的缓存已经过期
      const nowTime=(new Date()).getTime()-data.endTime;
      // 过期了，则删除
      if(nowTime>=0){
        window.localStorage.removeItem(key);
        return null;
      }
      // 未过期，返回key对应的值
      return data.value;
    }
    catch{
      window.localStorage.removeItem(key);
      return null;
    }
  },

  // 添加
  setItem(key,value,time){
    try{
      // 如果不支持localStorage，则返回null
      if(!window.localStorage){
        return null;
      }
      // 默认传值出错或不传值时，缓存时长为60分钟
      if(isNaN(time) || !time){
        time=60;
      }
      // 过期时间的毫秒数
      const endTime=(new Date()).getTime()+time*60*1000;
      window.localStorage.setItem(key,JSON.stringify({value:value,endTime:endTime}));
    }
    catch(e){
      return null;
    }
  },

  // 删除
  removeItem(key){
    window.localStorage.removeItem(key);
  },

  // 清除
  clear(){
    window.localStorage.clear()
  },

  // 长度
  length(){
    return window.localStorage.length;
  }
}

