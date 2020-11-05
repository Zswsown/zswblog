<template>
    <div class="materialMenuItem"
         @click="itemClick">
        <slot name="tabName">链接管理</slot>
    </div>
</template>

<script>
  export default {
    name: "MaterialMenuItem",
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
    .materialMenuItem{
        /*height:45px;*/
        width:100%;
        padding: 6px;
        text-align: center;
        line-height: 1em;
        font-size:1em;
        border-bottom: 1px solid #ccc;
    }
</style>