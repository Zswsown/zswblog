<template>
    <div class="blogFooter">
        <blog-item-info :blog-create-time="blogCreateTime"></blog-item-info>
        <blog-item-behavior :blog-item="blogItem"></blog-item-behavior>
    </div>
</template>

<script>
    import BlogItemBehavior from "./BlogItemBehavior";
    import BlogItemInfo from "./BlogItemInfo";
  export default {
    name: "BlogFooter",
    props:{
      blogCreateTime:{
        type:String,
        default(){
          return '1990-01-01 08:00:00'
        }
      },
      blogItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    components:{
      BlogItemBehavior,
      BlogItemInfo,
    }
  }
</script>

<style scoped>
.blogFooter{
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding-top: 1px;
}
</style>