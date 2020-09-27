// cookie是以键值对和";"的格式进行保存的，所以先将各个cookie分割出来，取相应的key对应的value值

// 取cookie中key对应的value值
export function getCookie(key){
  // 将浏览器保存的cookie进行切割，分割成各个"key=value"的形式
  let arrCookies=document.cookie.split("; ");
  // 遍历，若有该key，则返回对应的value，没有该key的话，则返回undefined
  for(let i=0;i<arrCookies.length;i++){
    let itemCookie=arrCookies[i].split('=');
    if(itemCookie[0]===key){
      return itemCookie[1];
    }
    else{
      return undefined;
    }
  }
}

// 给cookie添加key和value值，有5种形式：

// setCookie()，无参数
// setCookie("key")，一个参数，该key既是key值，也是value值
// setCookie({key: "xxx", value: "xxx", // expires: time})，一个参数，该参数是对象
// setCookie("key", "value")，两个参数（key，value）
// setCookie("key", "value", "expires")，三个参数（key，value，过期时间）

export function setCookie(...args){
  // 没有参数的情况
  if(args.length===0){
    document.cookies=''
  }
  // 一个参数的情况
  else if(args.length===1){
    // 该参数是字符串的情况
    if(typeof args[0] === 'string'){
      document.cookie=args;
    }
    // 该参数是对象的情况
    else{
      let obj=args[0];
      // 没有携带过期时间
      if(obj.expires===undefined){
        setCookie(obj.key,obj.value);
      }
      // 有携带过期时间
      else{
        setCookie(obj.key,obj.value,obj.expires);
      }
    }
  }
  // 两个参数的情况（"key","value"）
  else if(args.length===2){
    document.cookie=`${args[0]}=${args[1]}; `;
  }
  // 三个参数的情况（"key","value","expires"）
  else if(args.length===3){
    document.cookie=`${args[0]}=${args[1]}; expires=${expireTime(args[2])}; `;
  }
}

// 删除cookie
export function removeCookie(key){
  let cookie=getCookie(key);
  console.log(cookie);
  // -1的话是设定它前一毫秒就已经失效
  setCookie(key,cookie,-1);
}

// 格式化时间，delay是cookie可以保留的时间，单位为秒(s)
function expireTime(delay){
  let now=new Date();
  now.setSeconds(now.getSeconds()+delay+28800);
  return now.toUTCString();
}

function setCookie1(name,value,hours,path,domain,Secure,HttpOnly){
  let cookie_data=name+"="+value;
  if(hours){
    let d=new Date();
    d.setHours(d.getHours+hours);
    cookie_data+= path ? ("; path=" +path) : "";
    cookie_data+= domain ? ("; domain=" +domain) : "";
    cookie_data+= Secure ? ("; Secure=" +Secure) : false;
    cookie_data+= HttpOnly ? ("; HttpOnly=" +HttpOnly) : false;
    document.cookie=cookie_data;
  }
}