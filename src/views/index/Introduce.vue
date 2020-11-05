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

    @media screen and (max-width: 750px) {
        h2{
            width: 100%;
            word-wrap:break-word;
        }
    }

    h2 {
        word-break: break-all;
        padding: 0;
        margin: 0;
        position: absolute;
        left: 50%;
        top: 28%;
        transform: translateX(-50%);

          color:#7d3990;
            font-family: monospace;
        font-size:2em;
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
        font-size:2.1em;
    }
</style>