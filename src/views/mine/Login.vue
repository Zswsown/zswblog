<template>
    <div id="login">
        <form id="loginForm" action="http://localhost:3000/login" method="post" onclick="return check()">
            <div class="loginForm">
                <div class="loginFormData">
                    <p><input class="code" type="text" v-model="code" id="code" placeholder="请输入账号"></p>
                    <p><input class="password" type="password" v-model="password" id="password"placeholder="请输入密码"></p>
                </div>
                <div class="loginFormFooter">
                    <p><button class="loginbutton">登录</button></p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {BASE_URL,api} from "../../common/const";
    import {getCookie,setCookie,removeCookie} from "../../common/cookie";
    import {$get,$post,$axios} from '../../network/request';
  export default {
    name: "Login",
    data(){
      return{
        errMsg:'',
        isErrMsgShow:false,
        code:'',
        password:''
      }
    },
    mounted(){
      this.loginForm();
    },
    methods:{
      loginForm(){
        document.getElementById('loginForm').addEventListener('submit',function(){

          this.login();
        })
      },

      check(){
        let codeDOM=document.getElementById('code');
        let passwordDOM=document.getElementById('password');
        if(this.code==null){
          this.errMsg='账号为空';
          codeDOM.style.border='1px solid #e10602';
          codeDOM.setAttribute('placeholder',this.errMsg);
        }
        else if(this.password==null){
          this.errMsg='密码为空';
          passwordDOM.style.border='1px solid #e10602';
          passwordDOM.setAttribute('placeholder',this.errMsg);
        }
        else{

        }
      },

      login(){

        if(this.code===null || this.password===null){
          this.errMsg='账号或密码为空';

        }
        else{
          $axios({
            method:'post',
            url:BASE_URL+api.LOGIN_CHECK,
            data:{
              code:this.code,
              password:this.password
            },
            //非常重要，如果没加的话，cookie不会保存在浏览器，不会生效
            withCredentials:true,
          }).then(res=>{
            const cookie=document.cookie;
            console.log(cookie);
          })
        }
      }
    }

  }
</script>

<style scoped>
    #login{
        width:1080px;
        margin-top: 44px;
        height:calc(1920px - 44px);
    }
    .loginForm{
        width:280px;
        height:180px;
        background: #fff;
        box-shadow: 2px 2px 2px 2px #eeeeee;
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

    .loginbutton{
        display:inline-block;
        width:100px;
        height:40px;
        margin:10px 90px;

        border-radius: 5px;
        border:1px solid #ccc;
        background: #7d3990;
    }
</style>