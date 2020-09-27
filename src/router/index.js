import Vue from 'vue'
import VueRouter from 'vue-router'
import {getCookie,setCookie,removeCookie} from "../common/cookie";
import store from '../store/index';

const loginCookieKey='cookie';

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 路由懒加载，当路由被访问的时候才能加载对应组件
const Index=()=>import('../views/index/Index')
const Blog=()=>import('../views/blog/Blog')
const Material=()=>import('../views/material/Material')
const Mine=()=>import('../views/mine/Mine')
const BlogItemInfo=()=>import('../views/blog/childComps/blogContainer/BlogItemInfo')
const BlogContainer=()=>import('../views/blog/childComps/blogContainer/BlogContainer')

const Manage=()=>import('../views/manage/Manage')
const BlogManage=()=>import('../views/manage/childComps/blogManage/BlogManage')
const BlogInfo=()=>import('../components/common/blogList/blogInfo/BlogInfo')
const EditorManage=()=>import('../views/makedown/EditorManage')
const EditorAgainManage=()=>import('../views/makedown/EditorAgainManage')

const Login=()=>import('../components/common/login/Login')

const MessageManage=()=>import('../views/manage/childComps/messageManage/MessageManage')



// 1.安装路由插件
Vue.use(VueRouter)

// 2.配置路由信息
const routes=[
  {
    path:'/',
    redirect:'/blog'
  },
  {
    path:'/index',
    component:Index,
  },

  {
    path:'/blog',
    component:Blog,
    children:[
      {
        path:'/',
        redirect:'blogContainer',
      },
      {
        path:'blogContainer',
        component:BlogContainer,
      },
      {
        path:'blogItemInfo/:id',
        component:BlogItemInfo
      }
    ]
  },
  {
    path:'/material',
    component:Login,
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path: '/mine',
    component: Mine,
  },
  {
    path:'/manage',
    component:Manage,
    children: [
      {
        path:'/',
        redirect:'blogManage',
      },
      {
        path:'blogManage',
        component:BlogManage,
      },
      {
        path:'editAgainManage/:id',
        component:EditorAgainManage
      },
      {
        path:'blogInfo/:id',
        component:BlogInfo
      },
      {
        path:'messageManage',
        component:MessageManage
      },
      {
        path:'editorManage',
        component:EditorManage,
      }
    ]
  }
]

// 3.创建路由对象
const router=new VueRouter({
  routes,
  mode:'history',
})

// 4.创建导航守卫
router.beforeEach((to,from,next)=>{
  let loginState=store.state.isLogin;
  console.log(store.state.isLogin);
  if(to.path.indexOf('/manage')>=0){
    if(loginState||getCookie(loginCookieKey)){
      next();
    }
    else{
      next({path:'/material'})
    }
  }
  else{
    next();
  }
})

router.afterEach((to,from,next)=>{
  if(from.path.indexOf('/manage')>=0){
    store.commit('loginOut');
  }
})

// 4.导出路由
export default router
