<template>
    <!--    文章对应的留言块-->
    <tbody v-if="isShow">
        <message-item ref="messageItem"
                      v-for="(item,index) in messageBlock"
                      :message-block-title="messageBlock.blog_title"
                      :message-item="item"></message-item>
    </tbody>
</template>

<script>
    import MessageItem from './MessageItem'
  export default {
    name: "MessageBlock",
    components:{
      MessageItem,
    },
    props:{
      // 文章对应的留言块
      messageBlock:{
        type:Array,
        default(){
          return []
        }
      }
    },
    mounted() {
      // 对每篇文章的第一条留言（文章标题处）进行合并单元格操作
        this.setRowspan();
    },
    computed:{
      // 决定留言块是否显示，因为有些文章没有人留言，所以不用显示
      isShow(){
        return this.messageBlock.length>0;
      }
    },
    methods:{
      setRowspan(){
        if(this.messageBlock.length>0){
          this.$nextTick(()=>{
            // 设置文章标题的单元格显示出来
            this.$refs.messageItem[0].isBlogTitleShow=true;
            // 设置文章标题的单元格合并数为这篇文章的留言数
            this.$refs.messageItem[0].rowspanNum=this.messageBlock.length;
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>