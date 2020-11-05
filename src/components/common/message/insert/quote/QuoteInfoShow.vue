<template>
    <div class="quoteInfoShow">
        <a class="quoteA" :href="messageQuoteContent.quote_message_id">
            <span class="quoteSpan">@{{messageQuoteContent.quote_message_author}}</span>
        </a>
        <img class="quoteCancle" src="../../../../../assets/images/cancle.svg" alt="" @click="quoteInfoHide">
    </div>
</template>

<script>
  export default {
    name: "QuoteInfoShow",
    props:{
      messageQuoteContent:{
        type:Object,
        default(){
          return {};
        }
      },
      index:{
        type:Number,
        default(){
          return -1;
        }
      }
    },
    methods:{
      // 隐藏引用
      // 当我们点击某条留言的引用链接时，这条留言的数据会先进入vuex中的引用留言列表进行比较，
      // 看看是不是已经存在，是的话则不插入，否的话，则插入vuex中的state的引用留言列表messageQuoteContentList
      // 因为vuex中state的数据是响应式的，所以更新后的数据会通过绑定的QuoteInfoListShow组件再次进行渲染，
      // 每个item(QuoteInfoShow)对应着messageQuoteContentList中的每个元素，且它们的下标index也是相同的，
      // 所以在用户点击取消按钮时，传入响应的index，vuex中的state的messageQuoteContentList数组调用splice方法删除掉该下标的元素即可
      quoteInfoHide(){
        this.$store.commit('cleanMessageQuoteContent',this.index);
      }
    }
  }
</script>

<style scoped>
    .quoteInfoShow{
        /*height:30px;*/
        padding: 6px 0;
        margin:0 6px;
    }
    .quoteA,.quoteSpan{
        display: inline-block;
        height:1em;
    }
    .quoteCancle{
        vertical-align: middle;
        width: 1em;
        height:1em;
        margin:0 2px;
    }
</style>