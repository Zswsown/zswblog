<template>
    <div id="asideContainer">
        <message-container></message-container>
        <author-container></author-container>
    </div>
</template>

<script>
    import MessageContainer from "./messageContainer/MessageContainer";
    import AuthorContainer from "./AuthorContainer/AuthorContainer";
  export default {
    name: "AsideContainer",
    components:{
      MessageContainer,
      AuthorContainer,
    }
  }
</script>

<style scoped>
    #asideContainer{
        width:30%;
        height:calc(100vh - 60px);
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
    }
</style>