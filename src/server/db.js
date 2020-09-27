const mysql=require('mysql')

// 连接数据库时的配置
const mysqlConfig={
  host:'localhost',
  user:'root',
  password:'314356',
  database:'zswsownblog',
  port:'3306'
}

// 连接池
const pool=mysql.createPool({
  host:mysqlConfig.host,
  user:mysqlConfig.user,
  password:mysqlConfig.password,
  database:mysqlConfig.database,
  port:mysqlConfig.port,
  multipleStatements:true,//多语句查询
})

module.exports={mysqlConfig,pool};

