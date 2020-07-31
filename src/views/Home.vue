<template>
  <div style="height:100%;padding: 50px 50px 0 50px">
    <a-layout style="height:100%;padding: 24px 0; background-color: #fcfcfd;">
      <a-layout-sider width="216px" style="overflow:auto">
        <a-menu
          mode="inline"
          theme="light"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          style="height: 100%;"
        >
          <a-sub-menu key="sub1">
            <span slot="title">
              <icon-font type="icon-projectCount" class="sidebarfont" />项目管理
            </span>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
            <a-menu-item key="0">
              <a-button type="link" style="padding: 0px;" @click="showProject"><a-icon style="margin-right: 0px;" type="plus"/>新建项目</a-button>
            </a-menu-item>
            
          </a-sub-menu>
          <a-menu-item key="sub2">
            <icon-font type="icon-template" class="sidebarfont"/>模板
          </a-menu-item>
          <a-menu-item key="sub3">
            <icon-font type="icon-library" class="sidebarfont"/>归档库
          </a-menu-item>
          <!-- <a-sub-menu key="sub3">
            <span slot="title">
              <icon-font type="icon-library" />已归档
            </span>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu> -->
        </a-menu>
      </a-layout-sider>
      <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
      
        <task-panel
          v-for="(v) in list"
          :key="v.id"
          :title="v.title"
          :sub-title="v.subTitle"
          :boards="v.boards"
          @sort="boards=>sortBoards(v.id,boards)"
        />
        <create-project-modal ref="project"/>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import TaskPanel from "./home/TaskPanel";
import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";
import CreateProjectModal from "./components/CreateProjectModal";

export default {
  components: {
    TaskPanel, CreateProjectModal,
  },
  data: () => ({
    visibleProject: false,
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
  methods:{
    sortBoards(id,arr){
      if(this.list.find(v=>v.id == id))
      this.list.find(v=>v.id == id).boards = arr
    },
    showProject() {
      this.$refs.project.visibleProject = true
    },
  },

  mounted() {
  },
};
</script>

<style scoped>
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
.sidebarfont {
  font-size: 14px;
  color: #aaa;
}
</style>
