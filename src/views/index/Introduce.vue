<template>
    <div class="introduce">
        <h2>欢迎来到Zswsown的博客</h2>
    </div>
</template>

<script>
  export default {
    name: "Introduce"
  }
</script>

<style scoped>

    /*打字*/
    @keyframes typing {
        from {
            width:0;
        }
    }
    /*光标*/
    @keyframes blink-caret {
         50% {
             border-color:transparent;
         }
     }

    h2 {
          color:#7d3990;
            font-family: monospace;
        font-size:56px;
        font-weight: 700;
          border-right:1px solid;
          /* fallback */
          width:21ch;
          /* # of chars */
          white-space:nowrap;
          overflow:hidden;
          animation:typing 3s steps(21,end),/* # of steps = # of chars */
          blink-caret .5s step-end infinite alternate;
      }

    h2:hover{
        font-size:58px;
    }
</style>