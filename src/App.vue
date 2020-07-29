<template>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" :selected-keys="[]" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/project">Project</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <!-- <a-menu-item key="3">nav 3</a-menu-item> -->
      </a-menu>
    </a-layout-header>

    <a-layout-content>
      <div style="height:100%;overflow:auto">
        <router-view />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">Copyright © 2000 - 2020 DAMENG. All Rights Reserved.</a-layout-footer>
  </a-layout>
</template>

<style >
html,
body {
  height: 100%;
  position: absolute;
}

#components-layout-demo-top-side {
  height: 100%;
}
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}

*::-webkit-scrollbar {/*滚动条整体样式*/
    width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
    border-radius: 3px;
}
*::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 2px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
*::-webkit-scrollbar-track {/*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}

body{
    font-family: 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',  'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'!important;
}
</style>

