const crypto=require('crypto');

module.exports={
  // 自己随机键入的字符串
  MD5_SUFFIX:'dasd23das$%232fsw1213123sd%*12cd',
  md5(data){
    // 创建并返回一个hash对象，它是一个指定算法的加密hash，用于生成hash摘要
    let obj=crypto.createHash('md5');
    // 更新hash的内容为指定的data
    obj.update(data+this.MD5_SUFFIX);
    // 计算所有传入数据的hash摘要,编码方式指定为hex（十六进制）
    return obj.digest('hex');
  }
}
