<template>
    <div id="mine">
        <manage></manage>
        <editor v-show="false"
                class="editor"></editor>
    </div>
</template>

<script>
    import Manage from "../manage/Manage";
    import Editor from "../makedown/Editor";
    // const Manage=()=>import("../manage/Manage");
    // const Editor=()=>import("../makedown/Editor");
  export default {
    name: "Mine",
    components:{
      Editor,
      Manage
    }
  }
</script>

<style scoped>
    #mine{
        display: flex;
        justify-content: center;
        height:calc(100vh - 60PX);
    }
</style>