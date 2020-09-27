// d为实例化Date对象或时间字符串
//格式化日期
export function format(d){
  if(typeof(d)==='object'){
    var str=d.getFullYear()+"-"+ repair0(d.getMonth()+1)+"-"+repair0(d.getDate())
      +" "+ repair0(d.getHours()) +":"+ repair0(d.getMinutes()) +":"+ repair0(d.getSeconds());
    return str;
  }else{
    var date=new Date(d);
    // console.log(date);
    var str=date.getFullYear()+"-"+ repair0(date.getMonth()+1)+"-"+repair0(date.getDate())
      +" "+ repair0(date.getHours()) +":"+ repair0(date.getMinutes()) +":"+ repair0(date.getSeconds());
    return str;
  }
}

//补零
function repair0(n){
  return n<10? '0'+n : n;
}

//返回星期几
function getWeekday(d){
  var daynum=d.getDay();
  document.write(daynum);
  var weekday;
  switch(daynum){
    case 0:
      weekday="星期一";
      break;
    case 1:
      weekday="星期二";
      break;
    case 2:
      weekday="星期三";
      break;
    case 3:
      weekday="星期四";
      break;
    case 4:
      weekday="星期五";
      break;
    case 5:
      weekday="星期六";
      break;
    default:
      weekday="星期日";
      break;
  }
  return weekday;
}