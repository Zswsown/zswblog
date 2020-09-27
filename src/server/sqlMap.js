// sql语句
var sqlMap={
  getValue:'SELECT * FROM blogs WHERE blog_id = ?',
  setValue:'UPDATE blogs SET name = ? WHERE blog_id = ?'
}

module.exports=sqlMap;