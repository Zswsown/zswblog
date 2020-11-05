<template>
    <div id="asideContainer">
        <message-container></message-container>
        <author-container></author-container>
    </div>
</template>

<script>
    import MessageContainer from "./messageContainer/MessageContainer";
    import AuthorContainer from "./AuthorContainer/AuthorContainer";
    // const MessageContainer=()=>import("./messageContainer/MessageContainer");
    // const AuthorContainer=()=>import("./AuthorContainer/AuthorContainer");

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
        /*width:460px;*/
        height:calc(100vh - 60PX);
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
        margin-left: 60px;
    }
    @media screen and (max-width:750px){
        #asideContainer{
            display: none;
        }
    }
</style>