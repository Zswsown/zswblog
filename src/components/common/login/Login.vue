<template>
    <div id="login">
        <!--        @submit.prevent是阻止表单直接提交-->
<!--        <form id="loginForm" action="http://localhost:3000/login" method="post" @submit.prevent="loginCheck">-->
        <form id="loginForm" action="http://localhost:3000/login" method="post" @submit.prevent="login">
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
    // import {localStorage} from "../../../common/storage";

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
        token:'',
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
          // url:BASE_URL+api.LOGIN_CHECK,
          url:BASE_URL+api.LOGIN,
          data:{
            code:this.code,
            password:this.password,
            isKeepState:this.isKeepState,
          },
          //非常重要，如果没加的话，cookie不会保存在浏览器，不会生效
          withCredentials:true,
        }).then(res=>{
          console.log(res);
          // 一种是不记录登录状态的登录，一种是记录登录状态的十天免登录
          if(res.data.esg==='successWithCookie' || res.data.esg==='successWithoutCookie'){
            // 用vuex中的isLogin来保存登录状态，修改当前的登录状态为true
            this.$store.commit('login');
            // 路由跳转到管理页面
            this.$router.push('/manage/blogManage');
          }
          else if(res.data.esg==='fail'){
            // 显示账号密码错误
            this.$toast.show('账号密码错误',2000);
          }
        })
      },

      login(){
        $axios({
          method:'post',
          // url:BASE_URL+api.LOGIN_CHECK,
          url:BASE_URL+api.LOGIN,
          data:{
            code:this.code,
            password:this.password,
            isKeepState:this.isKeepState,
          },
          //非常重要，如果没加的话，cookie不会保存在浏览器，不会生效
          withCredentials:true,
        }).then(res=>{
          console.log(res);
          // this.$store.commit("setToken",res.data.token);
        })
      }
    }

  }
</script>

<style scoped>
    p{
        margin: 0;
        padding: 0;
    }

    #login{
        /*width: 1920px;*/
        width: 100%;
        margin-top: 60PX;
        height:calc(100vh - 60PX);
        border-radius: 20px;
        background:#ffffff url("../../../assets/images/loginBackground.jpg") no-repeat fixed center;
        background-size:cover;
        z-index: 9;
    }


    .loginForm{
        /*width:280px;*/
        /*height:210px;*/
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
        /*width:260px;*/
        height:2em;
        margin-top:20px;
        margin-left:20px;
        margin-right:20px;
        padding-left: 5px;

        border-radius: 10px;
        border:1px solid #ccc;
    }

    .select{
        /*height: 40px;*/
        /*width:260px;*/
        margin:4px 10px;
        display: flex;
        padding: 10px 0;
        align-items: center;
    }

    .select input{
        margin:0 6px;
    }

    .select label{
        font-size: .78em;
    }

    .loginbutton{
        display:inline-block;
        /*width:100px;*/
        /*height:40px;*/
        margin:0 90px 10px 90px;

        border-radius: 5px;
        border:1px solid #ccc;
        background: #7d3990;
    }

    .loginFormFooter{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>