<template>
    <table class="messageTable">
        <thead>
        <tr>
            <th class="select"></th>
            <th>文章标题</th>
            <th>留言作者</th>
            <th>留言内容</th>
            <th>邮箱地址</th>
            <th class="createtime">留言时间</th>
            <th class="behavior">操作</th>
        </tr>
        </thead>
        <message-block v-for="(item,index) in messageList"
                       :message-block="item"></message-block>
    </table>
</template>

<script>
    import MessageBlock from "./MessageBlock";

  export default {
    name: "MessageTable",
    components: {
      MessageBlock,
    },
    props:{
      messageList:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
    .messageTable{
        border-collapse: collapse;
        border:1px solid #000;
        font-size:18px;
    }

    th{
        border:1px solid #000;
        padding:6px 8px;

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