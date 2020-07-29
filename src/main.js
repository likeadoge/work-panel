import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import GlobelComponents from './components/globe/index';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import './style/all.scss'
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(GlobelComponents);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
});