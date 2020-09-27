// 连接数据库，增删改查方法的实现
const mysql =require('mysql');
const {pool}=require('./db');
const sqlMap=require('./sqlMap');

module.exports={
  getValue(req,res,next){
    var blog_id=req.query.id;
    pool.getConnection((err,connection)=>{
      var sql=sqlMap.getValue;
      connection.query(sql,[blog_id],(err,result)=>{
        res.json(result);
        connection.release();
      })
    })
  },
  setValue(req,res,next){
    console.log(req.body);
    var id=req.body.id;
    var name
  }
}