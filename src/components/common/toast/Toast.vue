<template>
    <div id="toast">
        <div class="toastMessage" v-show="isShow">{{message}}</div>
    </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return{
        //提示框的内容
        message:'',
        // 默认提示框不显示
        isShow:false,
      }
    },
    methods:{
      // 封装一个提示框显示的方法，利用定时器让其在duration时间后不显示
      show(message,duration){
        this.message=message;
        this.isShow=true;
        // 定时器
        setTimeout(()=>{
          this.message='';
          this.isShow=false;
        },duration)
      }
    }
  }
</script>

<style scoped>
.toastMessage{
    /*让提示框文本居中显示*/
    position:fixed;
    /*font-size: 1em;*/
    left:50%;
    top:30%;
    transform:translate(-50%,-50%);
    padding:8px 10px;
    z-index:9;

    border-radius:8px;
    color:#000;
    background: rgba(0,0,0,.4);
}
</style>