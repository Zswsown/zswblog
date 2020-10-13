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

// 切割方法，将总的留言数组切割成我们在分页器中设定的每页的留言总数（默认为10条），当点击对应的页码时，则显示对应的留言小数组
// 默认传进来的数组为空，切割的小数组的长度为1
export function chunk(arr=[],size=1){
  // 当数组为空时，返回一个空数组
  if(arr.length===0)return [];
  // 当数组不为空时
  return arr.reduce((total,currentValue)=>{
    // 当小数组的长度与规定的长度相等时，则新创建一个小数组，并将currentValue作为下一个小数组的起始值
    if(total[total.length-1].length===size){
      total.push([currentValue]);
    }
    // 当小数组的长度小于规定的长度size时，则将currentValue作为该小数组的元素
    else{
      total[total.length-1].push(currentValue);
    }
    return total;
  },[[]]);//[[]]是为了将分割后的小数组仍保留在一个大数组中
}