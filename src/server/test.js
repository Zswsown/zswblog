const express=require('express')
const path=require('path')
const bodyParser=require('body-parser');
const formidable=require('formidable');
const cookieParser=require('cookie-parser');
const app=express();

const SERVER =require('./common/const');

const common=require('./common/MD5');

// 对cookie值进行加密
const cookie_value=common.md5(SERVER.ROOT_PASSWORD);

// 对请求体的url进行解析
app.use(bodyParser.urlencoded({ extended: true }));
// 对请求体的参数进行转换
app.use(bodyParser.json());
// 访问静态文件
app.use('/upload/images',express.static(path.join(__dirname,'upload/images')));

app.use(cookieParser());

//设置跨域请求
app.all('*', function (req, res, next) {
  // 因为要保存cookie，所以这里的origin不能用'*'
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("X-Powered-By", '3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

var mysql=require('mysql');
var dbConfig={
  host:'localhost',
  user:'root',
  password:'314356',
  port:'3306',
  database:'zswsownblog',
};

// 建立缓冲池，防止同一个数据库不可以连接多次
var pool=mysql.createPool({
  connectionLimit:100,//连接限制
  host:dbConfig.host,
  user:dbConfig.user,
  password:dbConfig.password,
  port:dbConfig.port,
  database:dbConfig.database,
  multipleStatements:true,//多语句查询
});

app.get('/api/getBlogList',(req,res)=>{
  var selectSql='SELECT * FROM test';
  pool.getConnection((err,connection)=>{
    connection.query(selectSql,(err,result)=>{
      // 释放数据库连接
      connection.release();

      if(err){
        console.log('[SELECT ERROR] - '+err.message);
        return;
      }

      console.log('---SELECT---');
      console.log('SELECT ID:',result);
      console.log('-----');
      res.send({result});
    });
  })

})

app.post('/api/selectBlog',(req,res)=>{
  console.log(req.body);
  var selectSql='SELECT * FROM test WHERE blog_id = '+req.body.blog_id;
  pool.getConnection((err,connection)=>{
    connection.query(selectSql,(err,result)=>{
      // 释放数据库连接
      connection.release();

      if(err){
        console.log('[SELECT ERROR] - '+err.message);
        return;
      }

      console.log('---SELECT---');
      console.log('SELECT ID:',result);
      console.log('-----');
      res.send({result});
    });
  })

  console.log(req.body);
})

app.post('/api/insertBlog',(req,res)=>{
  var addSql='INSERT INTO test(blog_id,blog_content,blog_text_content,blog_title,blog_createtime) VALUES (0,?,?,?,?)';
  var addSqlParams=[req.body.blog_content,req.body.blog_text_content,req.body.blog_title,req.body.blog_createtime];
  pool.getConnection((err,connection)=>{
    connection.query(addSql,addSqlParams,(err,result)=>{
      // 释放数据库连接
      connection.release();

      if(err){
        console.log('[INSERT ERROR] - '+err.message);
        return;
      }

      console.log('---INSERT---');
      console.log('INSERT ID:',result);
      console.log('-----');
    });
  })

  console.log(req.body);
})

app.post('/api/deleteBlog',(req,res)=>{
  var delSql='DELETE FROM test WHERE blog_id = '+req.body.blog_id;
  pool.getConnection((err,connection)=>{
    connection.query(delSql,(err,result)=>{
      connection.release();
      if(err){
        console.log('[DELETE ERROR] - ' +err.message);
        return;
      }
      console.log('----DELETE----');
      console.log('DELETE ID:',result.affectedRows);
      console.log('--------------');
      res.send({result:result.affectedRows});
    })
  })
})

app.post('/api/updateBlog',(req,res)=>{
  var modSql='UPDATE test SET blog_title=?,blog_content=?,blog_text_content=?,blog_createtime=? WHERE blog_id=?';
  var modSqlParams=[req.body.blog_title,req.body.blog_content,req.body.blog_text_content,req.body.blog_createtime,req.body.blog_id];
  pool.getConnection((err,connection)=>{
    connection.query(modSql,modSqlParams,(err,result)=>{
      if(err){
        console.log('UPDATE ERROR -',err.message);
      }
       console.log('----UPDATE----');
      console.log('UPDATE affectdRows',result.affectedRows);
      console.log('----------------');
    })
  })
})

app.post('/api/insertImages',(req,res)=> {

  // 创建一个form对象
  const form = new formidable.IncomingForm();
  // 上传文件的保存地址
  form.uploadDir = './upload/images'
  // 设置添加的文件的扩展名
  form.keepExtensions = true;

  // fields指的是我们前台发送过来的表单数据，files指的是上传文件
  form.parse(req,(err,fields,files)=>{
    // 图片上传后的放在服务器的地址
    var path=files.imageName.path.replace(/\\/g,'/');
    var imageurl=SERVER.BASE_URL+path;
    console.log(imageurl);
    res.send({
      path:files.imageName.path,
      imageurl:imageurl,
    })
  })
  //
  // form.parse(req, (err, fields, files) => {
  //   // console.log(fields);
  //   // console.log(files);
  //
  //   var addSql = 'INSERT INTO testimg(img_id,img_url) VALUES (0,?)';
  //   console.log(files.image);
  //   var imgurl = path.join(__dirname,files.imageName);
  //   res.send({
  //     path:imgurl
  //   })
  //   var addSqlParams = [imgurl];
  //   pool.getConnection((err, connection) => {
  //     connection.query(addSql, addSqlParams, (err, result) => {
  //       // 释放数据库连接
  //       connection.release();
  //
  //       if (err) {
  //         console.log('[INSERT ERROR] - ' + err.message);
  //         return;
  //       }
  //
  //       console.log('---INSERT---');
  //       console.log('INSERT ID:', result);
  //       console.log('-----');
  //     });
  //   })
  // });
})

app.post('/api/loginCheck',(req,res)=>{
  console.log('我监听到了');

  if(req.body.code===SERVER.ROOT_CODE && req.body.password===SERVER.ROOT_PASSWORD){
    if(req.body.isKeepState){
      // 将cookie发送至客户端进行保存,设置为10天后过期
      res.cookie("cookie",cookie_value,{maxAge:10*24*60*60*1000});
      console.log(req.cookies);
      res.send({esg:'successWithCookie'});
    }
    else{
      res.send({esg:'successWithoutCookie'});
    }
  }
  else{
    res.send({esg:'fail'});
  }
})

// 监听端口
app.listen(3000);

console.log('服务器启动成功');

