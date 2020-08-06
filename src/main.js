import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import GlobelComponents from './components/globe/index';
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.less';
import store from './store'
import router from './router'
import './style/all.css'
import Storage from 'vue-ls';
import * as user from '@/request/user'
import { mapMutations } from 'vuex'
import moment from "moment";

moment.locale('zh-cn')

const options = {
    namespace: 'vuejs__', // key键前缀
    name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
    storage: 'local', // 存储名称: session, local, memory
};

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(GlobelComponents);
Vue.use(Storage, options);


window.Vue = Vue
window.rr = router
    /* eslint-disable no-new */

document.body.style.display = 'none'
new Vue({
    el: '#app',
    components: { App },
    router,
    store,
    template: '<App/>',
    methods: {
        ...mapMutations("userInfo", ["updateUserInfo", "shouldClearToken"]),
    },

    mounted() {
        if (!Vue.ls.get("ACCESS_TOKEN")) {
            this.$router.push('/login').then(() => {

                setTimeout(() => {
                    document.body.style.display = 'block'
                }, 200);
            })

        } else {
            user.getUserInfo().then(info => {
                this.updateUserInfo({
                    token: Vue.ls.get("ACCESS_TOKEN"),
                    username: info.realname,
                    avatar: "blank",
                    org: info.depName,
                })
            }).finally(() => {
                setTimeout(() => {
                    document.body.style.display = 'block'
                }, 200);
            })
        }
    }
});