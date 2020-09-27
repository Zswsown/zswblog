import Toast from './Toast';

// 定义一个对象
const obj={}

// 当入口文件main.js在执行Vue.use(toast)方法安装toast这个插件时，会来这里执行obj的install方法
// 因为我们在导出obj时，是使用可以重命名的方式，所以我们在main.js中将obj重命名为toast

obj.install=function(Vue){
  // 1.创建一个组件构造器
  const toastConstructor=Vue.extend(Toast);
  // 2.用new的方式，根据组件构造器创建出一个组件对象
  const toast=new toastConstructor();
  // 3.将组件对象手动的挂载到某一个元素上
  toast.$mount(document.createElement('div'));
  // 4.toast.$el对应的就是div,将该元素添加到body上
  document.appendChild(toast.$el);
  // 5.将main.js在安装该插件时传过来的Vue市里的prototype属性定义为该Toast对象toast
  Vue.prototype.$toast=toast
}

// 导出obj对象
export default obj