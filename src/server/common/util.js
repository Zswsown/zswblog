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