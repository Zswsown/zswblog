<template>
    <tr class="messageItem">
        <!--        复选框-->
        <td class="select">
            <input type="checkbox" name="messageSelect">
        </td>
        <!--        文章标题-->
        <td :rowspan="rowspan" v-if="isShow">
            {{messageBlockTitle}}
        </td>
        <!--        留言作者-->
        <td>
            {{messageItem.message_author}}
        </td>
        <!--        留言内容-->
        <td>
            {{messageItem.message_content}}
        </td>
        <!--        留言作者邮箱-->
        <td>
            {{messageItem.message_author_email}}
        </td>
        <!--        留言创建时间-->
        <td class="createtime">
            {{getFormatTime}}
        </td>
        <!--        对留言的操作-->
        <td class="behavior">
            <input class="delete" type="button" value="删除">
            <input class="reply" type="button" value="回复">
        </td>
    </tr>
</template>

<script>
    import {format} from "../../../../common/utils";

    export default {
    name: "MessageItem",
    props:{
      // 留言
      messageItem:{
        type:Object,
        default(){
          return {}
        }
      },
      // 文章标题
      messageBlockTitle:{
        type:String,
        default(){
          return ''
        }
      },
    },
      data(){
          return{
            isBlogTitleShow:false,
            rowspanNum:0,
          }
      },

    computed:{
      // 将数据库取到的时间格式化
      getFormatTime(){
        return format(this.messageItem.message_createtime);
      },
      // 是否显示文章标题
      isShow(){
        return this.isBlogTitleShow;
      },
      // 动态监听文章标题对应的rowspan的数目有没有变化
      rowspan(){
        return this.rowspanNum;
      }
    }
  }
</script>

<style scoped>
    .delete,.reply{
        display:inline-block;
        width:100px;
        height:40px;
        margin:0 8px;

        border-radius: 5px;
        border:1px solid #ccc;
        color: #fff;
        background: #7d3990;
    }

    td{
        border:1px solid #000;
        padding:6px 8px;
        text-align: center;
    }

    .behavior{
        height:53px;
        width:249px;
    }

    .createtime{
        width: 185px;
        height: 53px;
    }

    .select{
        width: 30px;
        height: 53px;
    }
</style>