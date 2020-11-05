<template>
    <div class="quoteInfoListShow">
        <quote-info-show v-for="(item,index) in messageQuoteContentList"
                         :message-quote-content="item"
                         :index="index"></quote-info-show>
    </div>
</template>

<script>
    import QuoteInfoShow from "./QuoteInfoShow";
    // const QuoteInfoShow=()=>import('./QuoteInfoShow');
  export default {
    name: "QuoteInfoListShow",
    components:{
      QuoteInfoShow
    },
    props:{
      // 引用的留言的信息列表
      messageQuoteContentList:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
    .quoteInfoListShow{
        display: flex;
    }
</style>