<template>
    <div id="tabMenu">
        <blog-menu></blog-menu>
        <material-menu></material-menu>
    </div>
</template>

<script>
    import BlogMenu from "./BlogMenu";
    import MaterialMenu from "./MaterialMenu";
  export default {
    name: "TabMenu",
    components:{
      BlogMenu,
      MaterialMenu,
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