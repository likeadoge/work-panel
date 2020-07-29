<template>
  <div style="height:100%;padding: 50px 50px 0 50px">
    <a-layout style="height:100%;padding: 24px 0; background: #fff">
      <a-layout-sider width="200" style="background: #fff;overflow:auto">
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          style="height: 100%"
        >
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="user" />项目
            </span>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="laptop" />模板
            </span>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="notification" />已归档
            </span>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
        <task-panel
          v-for="(v) in list"
          :key="v.id"
          :title="v.title"
          :sub-title="v.subTitle"
          :boards="v.boards"
        />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import TaskPanel from "./home/TaskPanel";
import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";

export default {
  components: {
    TaskPanel,
  },
  data: () => ({
    // list:[]
    list: new Array(5).fill(0).map(() => ({
      id: uuid(), // 项目 id
      title: ph(), // 标题
      subTitle: ph(), // 副标题
      boards: new Array(5).fill(0).map(() => ({
        title: ph(), // 标题
      })),
    })),
  }),

  mounted() {
    console.log(this.list);
  },
};
</script>

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
</style>
