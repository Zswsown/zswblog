const express=require('express')
const path=require('path')
const bodyParser=require('body-parser');
const formidable=require('formidable');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');

const app=express();

const SERVER =require('./common/const');
const config=require('./common/config');

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
  //console.log(req.headers.origin);
  // 因为要保存cookie，所以这里的origin不能用'*'
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
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
  connectionLimit:100,
});

app.use(expressJwt({
  algorithms: ['HS256'],
  secret:config.secret,
}).unless({
  path:[
    "/api/login",
    '/api/getBlogList',
    "/api/insertImages",
    "/api/selectMessage",
    "/api/insertMessage",
    "/api/updateMessage",
    '/api/insertQuoteMessage',
    '/api/selectQuoteMessage',
    '/api/insertReplyMessage',
    '/api/selectReplyMessage',
    '/api/selectMessageList',
    '/api/getMessageList',
    '/api/getWatchSum',
    '/api/updateWatchSum',
    '/api/selectMaterialList',
  ]
}))

// 如果express-jwt解析token出错，中间件会抛出UnauthorizedError错误
app.use((err,req,res,next)=>{
  // 当token验证失败时会抛出如下错误
  console.log(err);
  if(err.name==='UnauthorizedError'){
    // console.log('无效token');
    res.status(401).send({
      status:'fail',
      message:'身份校验过期，请重新登录'
    })
  }
})

app.get('/api/getBlogList',(req,res)=>{
  let selectSql='SELECT * FROM blogs';
  console.log(pool);
  pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log(connection);
    connection.query(selectSql,(err,result)=>{
      // 释放数据库连接
      connection.release();

      if(err){
        console.log('[SELECT ERROR] - '+err.message);
        return;
      }

      console.log('---SELECT BLOGLIST---');
      console.log('SELECT ID:',result);
      console.log('-----');
      res.send({result});
    });
  })

})

app.post('/api/selectBlog',(req,res)=>{
  let selectSql='SELECT * FROM blogs WHERE blog_id = '+req.body.blog_id;
  pool.getConnection((err,connection)=>{
    connection.query(selectSql,(err,result)=>{
      // 释放数据库连接
      connection.release();

      if(err){
        console.log('[SELECT BLOG ERROR] - '+err.message);
        return;
      }

      console.log('---SELECT BLOG---');
      console.log('SELECT BLOG ID:',result);
      console.log('-----');
      res.send({result});
    });
  })

  console.log(req.body);
})

app.post('/api/insertBlog',(req,res)=>{
  var addSql='INSERT INTO blogs(blog_id,blog_content,blog_text_content,blog_title,blog_createtime) VALUES (0,?,?,?,?)';
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
  var delSql='DELETE FROM blogs WHERE blog_id = '+req.body.blog_id;
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
  var modSql='UPDATE blogs SET blog_title=?,blog_content=?,blog_text_content=?,blog_createtime=? WHERE blog_id=?';
  var modSqlParams=[req.body.blog_title,req.body.blog_content,req.body.blog_text_content,req.body.blog_createtime,req.body.blog_id];
  pool.getConnection((err,connection)=>{
    connection.query(modSql,modSqlParams,(err,result)=>{
      // 释放数据库连接
      connection.release();
      if(err){
        console.log('UPDATE ERROR -',err.message);
      }
       console.log('----UPDATE----');
      console.log('UPDATE affectdRows',result.affectedRows);
      console.log('----------------');
    })
  })
})

app.post('/api/selectMessage',(req,res)=>{
  let selectSql='SELECT * FROM messages WHERE blog_id = '+req.body.blogID;

  pool.getConnection((err,connection)=>{
    connection.query(selectSql,(err,result)=>{
      // 释放数据库连接
      connection.release();
      if(err){
        console.log('----SELECT MESSAGE ERROR----');
        console.log(err.message);
        console.log('------------');
        return;
      }
      else{
        console.log('---SELECT MESSAGE ACCESS----');
        console.log(result);
        console.log('------------');
        res.send({result});
      }
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
})

// 监听登录，对登录进行检查
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

app.post('/api/login',(req,res)=>{
  if(req.body.code===SERVER.ROOT_CODE && req.body.password===SERVER.ROOT_PASSWORD){
    let expriesIn=0;
    //isKeepState是登录框中是否选中“十天免登录的状态”,是的话，过期时间为10天
    if(req.body.isKeepState){
      expriesIn=config.keepStateExpiresIn
    }
    // 未选中的话，过期时间为30分钟
    else{
      expriesIn=config.expiresIn;
    }

    console.log(expriesIn);
    //jwt.sign用于生成token
    let token = jwt.sign({
        name:req.body.userName,//自定义要进行加密的payload
      },
      config.secret,//自定义密钥
      {
        expiresIn: expriesIn,//过期时间
      })
    //将token发送给客户端，在客户端中的localStorage进行保存
    res.status(200).send({
      token:token,
      expriesIn:expriesIn,
    })
  }
  else{
    res.status(401).send({esg:'fail'});
  }
})

app.post('/api/insertMessage',(req,res)=>{
  let addSql='INSERT INTO messages(' +
    'blog_id,blog_title,message_author,message_content,message_createtime,message_author_email,message_selected) ' +
    'VALUES (?,?,?,?,?,?,?)';
  let addParams=[
    req.body.blogID,
    req.body.blogTitle,
    req.body.messageAuthor,
    req.body.messageContent,
    req.body.messageCreateTime,
    req.body.messageAuthorEmail,
    0,
  ];
  pool.getConnection((err,connection)=>{
    connection.query(addSql,addParams,(err,result)=>{
      connection.release();
      if(err){
        console.log('[INSERT MESSAGE ERROR] - '+err.message);
        res.send({esg:'fail'});
        return;
      }

      console.log('---INSERT MESSAGE SUCCESS---');
      console.log('INSERT MESSAGE ID:',result);
      console.log('-----');
      res.send({
        esg:'success',
        messageID:result.insertId,
      });
    })
  })
})

app.post('/api/deleteMessage',(req,res)=>{
  // 因为有外键约束，在执行删除操作时，先将外键约束关闭，删除好数据后，在开启外键约束
  let deleteSql='SET foreign_key_checks = 0;' +
    'DELETE quotemessages,replymessages,messages FROM messages ' +
    'LEFT JOIN quotemessages ON messages.message_id=quotemessages.message_id ' +
    'LEFT JOIN replymessages ON messages.message_id=replymessages.message_id ' +
    'WHERE messages.message_id = '+req.body.message_id
    +';SET foreign_key_checks = 1;';
  pool.getConnection((err,connection)=>{
    connection.query(deleteSql,(err,result)=>{
      connection.release();
      if(err){
        console.log('[DELETE MESSAGE ERROR] - ' +err.message);
        return;
      }
      console.log('----DELETE MESSAGE----');
      console.log('DELETE MESSAGE ID:',result);
      console.log('--------------');
      res.send({result:result});
    })
  })
})

app.post('/api/deleteMessages',(req,res)=>{
  // 因为有外键约束，在执行删除操作时，先将外键约束关闭，删除好数据后，在开启外键约束
  let deleteSql='SET foreign_key_checks = 0;' +
    'DELETE quotemessages,replymessages,messages FROM messages ' +
    'LEFT JOIN quotemessages ON messages.message_id=quotemessages.message_id ' +
    'LEFT JOIN replymessages ON messages.message_id=replymessages.message_id ' +
    'WHERE messages.message_id in '+req.body.deleteMessageIDs
    +';SET foreign_key_checks = 1;';
  pool.getConnection((err,connection)=>{
    connection.query(deleteSql,(err,result)=>{
      connection.release();
      if(err){
        console.log('[DELETE MESSAGES ERROR] - ' +err.message);
        res.send({err:err.message});
        return;
      }
      console.log('----DELETE MESSAGES----');
      console.log('DELETE MESSAGES ID:',result);
      console.log('--------------');
      res.send({result:result});
    })
  })
})

app.post('/api/insertQuoteMessage',(req,res)=>{
  // 数组要用二维数组来接收，不然会报错
  let values=new Array();
  let list=req.body.messageQuoteContentList;
  // 将数组中的每个对象转变为数组格式（即数组中还是数组）
  for(let i=0;i<list.length;i++){
    values[i]=new Array(4);
    values[i][0]=req.body.messageID;
    values[i][1]=list[i].quote_message_id;
    values[i][2]=list[i].quote_message_author;
    values[i][3]=list[i].quote_message_content;
  }

  let addSql='INSERT INTO quotemessages(message_id,quote_message_id,quote_message_author,quote_message_content) VALUES ?';

  pool.getConnection((err,connection)=>{
    connection.query(addSql,[values],(err,result)=>{
      connection.release();
      if(err){
        console.log('----INSERT QUOTE ERROR----');
        console.log('ERROR:'+err.message);
        console.log('--------------------');
        return;
      }
      console.log('----INSERT QUOTE SUCCESS----');
      console.log('INSERT ID:'+result.insertId);
      console.log('----------------------');
      res.send({id:result.insertId});
    })
  })
})

app.post('/api/selectQuoteMessage',(req,res)=>{
  let selectSql='SELECT * FROM quotemessages WHERE message_id='+req.body.messageID;
  pool.getConnection((err,connection)=>{
    connection.query(selectSql,(err,result)=>{
      connection.release();
      if(err){
        console.log('----SELECT ERROR----');
        console.log(err.message);
        console.log('----------------');
        return;
      }
      console.log('----SELECT SUCCESS----');
      console.log(result);
      console.log('--------------------');
      res.send({quoteMessages:result});
    })
  })
})

app.post('/api/insertReplyMessage',(req,res)=>{
  let addSql='INSERT INTO replymessages(message_id,reply_id,reply_author) values (?,?,?)';
  let addParams=[req.body.messageID,req.body.replyMessageID,req.body.replyMessageAuthor];
  pool.getConnection((err,connection)=>{
    connection.query(addSql,addParams,(err,result)=>{
      connection.release();
      if(err){
        console.log('---INSERT REPLY ERROR---');
        console.log(err.message);
        console.log('------');
        return;
      }
      console.log('---INSERT REPLY SUCCESS');
      console.log(result);
      console.log('-------');
      res.send({id:result.insertId});
    })
  })
})

app.post('/api/selectReplyMessage',(req,res)=>{
  let selectSql='SELECT * FROM replymessages WHERE message_id ='+req.body.messageID;
  pool.getConnection((err,connection)=>{
    connection.query(selectSql,(err,result)=>{
      connection.release();
      if(err){
        console.log('---SELECT REPLY ERROR---');
        console.log(err.message);
        console.log('------');
        return;
      }
      console.log('---SELECT REPLY SUCCESS');
      console.log(result);
      console.log('-------');
      res.send({replyMessage:result});
    })
  })
})

app.post('/api/selectMessageList',(req,res)=>{
  let blogs=req.body.blogs;
  console.log(blogs);
  let selectSql='SELECT * FROM messages WHERE blog_id = ';
  let selectSqls='';
  for(let i=0;i<blogs.length;i++){
    selectSqls=selectSqls+selectSql+blogs[i].blog_id+'; ';
  }
  //console.log(selectSqls);

  pool.getConnection((err,connection)=>{
    connection.query(selectSqls,(err,result)=>{
      connection.release();
      if(err){
        console.log('---SELECT MESSAGE LIST ERROR---');
        console.log(err);
        console.log('----');
        return;
      }
      console.log('---SELECT MESSAGE LIST SUCCESS---');
      console.log(result);
      console.log('----');
      res.send({
        result:result,
      })
    })
  })
})

app.get('/api/getMessageList',(req,res)=>{
  let selectSql='SELECT * FROM messages';
  pool.getConnection((err,connection)=>{
    connection.query(selectSql,(err,result)=>{
      connection.release();
      if(err){
        console.log('---SELECT MESSAGESUM ERROR---');
        console.log(err.message);
        console.log('-----');
        return;
      }
      console.log('---SELECT MESSAGESUM SUCCESS---');
      console.log(result);
      console.log('----');
      res.send({
        result:result,
      })
    })
  })
})

app.get('/api/getWatchSum',(req,res)=>{
  let selectSql="SELECT * FROM root WHERE root_code='Zswsown' AND root_password=314356";
  pool.getConnection((err,connection)=>{
    connection.query(selectSql,(err,result)=>{
      connection.release();
      if(err){
        console.log('---SELECT WATCHSUM ERROR---');
        console.log(err.message);
        console.log('-----');
        return;
      }
      let formatResult=JSON.parse(JSON.stringify(result));
      console.log('---SELECT WATCHSUM SUCCESS---');
      console.log(formatResult[0].watch_sum);
      console.log('----');
      res.send({
        result:formatResult[0].watch_sum,
      })
    })
  })
})

app.post('/api/updateWatchSum',(req,res)=>{
  let updateSql="UPDATE root set watch_sum=? WHERE root_code=? and root_password=?";
  console.log(req.body.watchSum);
  let updateParams=[req.body.watchSum,'Zswsown',314356];
  pool.getConnection((err,connection)=>{
    connection.query(updateSql,updateParams,(err,result)=>{
      connection.release();
      if(err){
        console.log('---UPDATE WATCHSUM ERROR---');
        console.log(err.message);
        console.log('-----');
        return;
      }
      console.log('---UPDATE WATCHSUM SUCCESS---');
      console.log(result);
      console.log('----');
      res.send({
        result:result,
      })
    })
  })
})

app.post('/api/insertMaterialIcon',(req,res)=>{
  // 创建一个form对象
  const form = new formidable.IncomingForm();
  // 上传文件的保存地址
  form.uploadDir = './upload/images/materials'
  // 设置添加的文件的扩展名
  form.keepExtensions = true;

  // fields指的是我们前台发送过来的表单数据，files指的是上传文件
  form.parse(req,(err,fields,files)=>{
    // // 图片上传后的放在服务器的地址
    var path=files.material.path.replace(/\\/g,'/');
    var iconurl=SERVER.BASE_URL+path;
    // console.log(iconurl);
    // console.log(path);
    res.send({
      path:path,
      iconurl:iconurl,
    })
  })
})

app.post('/api/insertMaterial',(req,res)=>{
  let addSql='INSERT INTO materials(material_url,material_title,material_icon_url) VALUES (?,?,?)';
  let addParams=[req.body.material.material_url,req.body.material.material_title,req.body.material.material_icon_url];
  pool.getConnection((err,connection)=>{
    connection.query(addSql,addParams,(err,result)=>{
      connection.release();
      if(err){
        console.log('---INSERT MATERIAL ERROR---');
        console.log(err.message);
        console.log('------');
        return;
      }
      console.log('---INSERT MATERIAL SUCCESS');
      console.log(result);
      console.log('-------');
      res.send({result:'success'});
    })
  })
})

app.get('/api/selectMaterialList',(req,res)=>{
  let selectSql='SELECT * FROM materials';
  pool.getConnection((err,connection)=>{
    connection.query(selectSql,(err,result)=>{
      connection.release();
      if(err){
        console.log('---SELECT MATERIALS ERROR---');
        console.log(err.message);
        console.log('-----');
        return;
      }
      console.log('---SELECT MATERIALS SUCCESS---');
      console.log(result);
      console.log('----');
      res.send({
        result:result,
      })
    })
  })
})

// 监听端口
app.listen(3000);

console.log('服务器启动成功');

