<template>
    <div id="tabMenu">
        <blog-menu></blog-menu>
    </div>
</template>

<script>
    import BlogMenu from "./BlogMenu";
  export default {
    name: "TabMenu",
    components:{
      BlogMenu
    }
  }
</script>

<style scoped>
    #tabMenu{

        display: flex;
        flex-direction:column;
        align-items:center;
    }

</style>