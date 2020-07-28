import IconFont from "./IconFont.vue";
import AsyncButton from "./AsyncButton.vue";
import flex from './flex/index'
import ItemsFlow from './ItemsFlow.vue'

export default {
    install: function (Vue) {
        Vue.component('IconFont', IconFont)
        Vue.component('AsyncButton', AsyncButton)
        Vue.component('ItemsFlow', ItemsFlow)
        Vue.use(flex)
    }
}
