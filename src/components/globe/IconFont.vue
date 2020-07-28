

<template>
  <component 
  :is="type.indexOf('icon')<0?'AIcon':'CustomIcon'" 
  :type="type" />
</template>

<script>
// import {Icon} from 'ant-design-vue'

import { Icon as AntIcon } from "ant-design-vue";

const CustomIcon =  AntIcon.createFromIconfontCN({
    scriptUrl: "/icon.js"
})

export default {
    props:["type"],
    components:{
        AntIcon,CustomIcon
    }
}
</script>

<style>

</style>