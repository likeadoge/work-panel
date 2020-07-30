import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import GlobelComponents from './components/globe/index';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import './style/all.css'
import Storage from 'vue-ls';


const options = {
  namespace: 'vuejs__', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
};
 
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(GlobelComponents);
Vue.use(Storage, options);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>',
});