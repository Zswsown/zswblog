<template>
    <div id="editorAgain">
        <!--        defaultOpen="preview时才会同时打开编辑和预览区域"-->
        <mavon-editor style="height: 100%;width:100%;"
                      :value="blogContent"
                      ref="md"
                      defaultOpen="preview"
                      preview="true"
                      :scrollStyle="false"
                      :boxShadow=boxShadow
                      :toolbars="toolbars"
                      :ishljs="true"
                      :subfield="true"
                      @imgAdd="$imgAdd"></mavon-editor>
    </div>
</template>

<script>
  import {format} from "../../common/utils";
  import {$get,$post,$axios} from '../../network/request';
  import {BASE_URL,api} from "../../common/const";
  export default {
    name: "EditorAgain",
    props: {
      // 编辑器是否呈现阴影样式
      boxShadow: {
        type: Boolean,
        default() {
          return true
        }
      },

      // 文章标题
      blogTitle: {
        type: String,
        default() {
          return ''
        }
      },

      // 文章内容
      blogContent:{
        type:String,
        default(){
          return ''
        }
      }
    },
    data(){
      return{
        // mavon-editor菜单栏的相关配置
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
      }
    },

    mounted() {
      this.$bus.$on('edit',this.publish);
    },

    methods:{

      // 保存文章
      // value指的是编辑时的文字（Markdown形式），render指的是渲染好的HTML代码
      // 给id设为-1，以便区分是更新文章还是新建文章
      updateBlog(value,render,title,api,id){
        // 1.插入文章标题
        var hTitle="<h1>"+title+"</h1>";

        // 2.添加文章创建时间
        let blogCreateTime=new Date();

        // 3.从数据库中取出的Datatime数据类型的日期需要再次格式化下，变成我们想要的时间戳
        blogCreateTime=format(blogCreateTime);

        // 4.将文章标题添加到渲染好的HTML页面的最前面
        render=hTitle.toString()+render;

        // 5.将文章添加到数据库中
        // 更新文章
        $post(BASE_URL+api,{
          blog_id:id,
          blog_content:render,
          blog_text_content:value,
          blog_title:title,
          blog_createtime:blogCreateTime,
        }).then((res)=>{
          console.log('res',res);
        })
      },

      // 添加图片操作
      // pos是指图片文件在md文件中的名称，$file指的是图片文件对象
      $imgAdd(pos,$file){
        // 1.将图片上传到服务器.

        // 新建一个formData对象，因为普通的上传文字的格式为‘Content-Type’:‘application/x-www-application-urlencoded’，不支持上传照片，
        // ‘Content-Type’:‘multipart/form-data’这种格式的支持上传照片文件
        var formdata = new FormData();

        // 2.在form上面添加属于该文件名的key值，便于在后台取到该文件名
        formdata.append('imageName', $file);

        // 3.将图片发送到服务器存储起来，并返回其在md文件中的文件名和该图片在服务器的url地址
        $axios({
          url: 'http://localhost:3000/api/insertImages',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((url) => {
          // （1）将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(pos, url.data.imageurl);
          console.log(url.data);
        })
      },

      // 发布文章
      publish(id){
        console.log(this.$refs.md);
        // 1.通过ref对组件进行命名，this.$refs.命名取到该组件，拿到该组件的render和value值，调用save方法进行保存
        let render=this.$refs.md.d_render;
        let value=this.$refs.md.value;
        let title=this.blogTitle;

        // 2.文章为空，进行提示；文章不为空，调用保存操作
        if(value.length===0){
          alert('文章内容为空');
        }
        else{
          console.log(id);
          this.updateBlog(value,render,title,api.UPDATE_BLOG,id);
        }
      }
    },
  }
</script>

<style scoped>

</style>