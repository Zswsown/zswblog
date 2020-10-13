<template>
    <div id="login">
        <!--        @submit.prevent是阻止表单直接提交-->
        <form id="loginForm" action="http://localhost:3000/login" method="post" @submit.prevent="loginCheck">
            <div class="loginForm">
                <div class="loginFormData">
                    <p><input class="code" type="text" v-model="code" id="code" placeholder="请输入账号"  required="required"></p>
                    <p><input class="password" type="password" v-model="password" id="password" placeholder="请输入密码"  required="required"></p>
                </div>
                <div class="select">
                    <input type="checkbox" id="keepState" name="select" value="keepState" @click="selectClick">
                    <label for="keepState">十天内免登录</label>
                </div>
                <div class="loginFormFooter">
                    <button class="loginbutton">登录</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {BASE_URL,api} from "../../../common/const";
    import {$get,$post,$axios} from '../../../network/request';
  export default {
    name: "Login",
    data(){
      return{
        // 错误信息
        errMsg:'',
        // 是否显示错误信息
        isErrMsgShow:false,
        // 账号
        code:'',
        // 密码
        password:'',
        // 是否勾选十天免登录
        isKeepState:false,
      }
    },
    methods:{
      selectClick(){
        this.isKeepState=document.getElementById('keepState').checked;
        console.log(this.isKeepState);
      },


      loginCheck(){
        $axios({
          method:'post',
          url:BASE_URL+api.LOGIN_CHECK,
          data:{
            code:this.code,
            password:this.password,
            isKeepState:this.isKeepState,
          },
          //非常重要，如果没加的话，cookie不会保存在浏览器，不会生效
          withCredentials:true,
        }).then(res=>{
          console.log(res);
          if(res.data.esg==='successWithCookie' || res.data.esg==='successWithoutCookie'){
            this.$store.commit('login');
            this.$router.push('/manage/blogManager');
          }
          else if(res.data.esg==='fail'){
            this.$toast.show('账号密码错误',2000);
          }
        })
        return false;
      },
    }

  }
</script>

<style scoped>
    #login{
        width: 1920px;
        margin-top: 60px;
        height:calc(1080px - 60px);
        border-radius: 20px;
        background:#ffffff url("../../../assets/images/loginBackground.jpg") no-repeat fixed center;
        background-size:1920px 1020px;
        z-index: 9;
    }


    .loginForm{
        width:280px;
        height:210px;
        background: rgba(255,255,255,.4);
        box-shadow: 1px 1px 1px 1px #eeeeee;
        border-radius:20px;

        position:fixed;
        left:50%;
        top:30%;
        transform:translate(-50%);
    }

    .code,.password{
        display:inline-block;
        width:260px;
        height:40px;
        margin-top:20px;
        margin-left:10px;
        margin-right:10px;
        padding-left: 5px;

        border-radius: 10px;
        border:1px solid #ccc;
    }

    .select{
        height: 40px;
        width:260px;
        margin:0 10px;
        display: flex;
        align-items: center;
    }

    .select input{
        margin:0 6px;
    }

    .select label{
        font-size: 16px;
    }

    .loginbutton{
        display:inline-block;
        width:100px;
        height:40px;
        margin:0 90px 10px 90px;

        border-radius: 5px;
        border:1px solid #ccc;
        background: #7d3990;
    }
</style>