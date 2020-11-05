<template>
    <div class="blogMenuItem"
        @click="itemClick">
        <slot name="tabName">文章管理</slot>
    </div>
</template>

<script>
  export default {
    name: "BlogMenuItem",
    props:{
      path:{
        require: true,
        type:String,
      }
    },
    methods:{
      itemClick(){
        console.log(this.path);
        this.$router.replace(this.path);
      }
    }
  }
</script>

<style scoped>
    .blogMenuItem {
        /*height: 45px;*/
        width: 100%;
        text-align: center;
        padding: 6px;
        line-height: 1em;
        font-size: 1em;
        border-bottom: 1px solid #ccc;
    }

</style>