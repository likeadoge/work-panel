<template>
  <div style="height:100%;padding: 32px 48px;">
    <a-layout style="height:100%;padding: 32px 0px 0px 0px; background-color: #fcfcfd;">
      <a-layout-sider width="216px" class="bg" style="overflow:auto;">
        <!-- <a-menu
          mode="inline"
          theme="light"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          style="height: 100%; background-color: #fcfcfd;"
            >
          <a-sub-menu key="sub1">
            <span slot="title">
              <icon-font type="icon-projectCount" class="sidebarfont" />项目管理
            </span>
            <template v-for="(v,i) in projectList">
              <a-menu-item :key="i">{{v.name}}</a-menu-item>
            </template>
            <a-menu-item key="0">
              <a-button type="link" style="padding: 0px;" @click="showProject">
                <a-icon style="margin-right: 0px;" type="plus" />新建项目
              </a-button>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="sub2">
            <router-link to="/template">
              <icon-font type="icon-template" class="sidebarfont" />模板库
            </router-link>
          </a-menu-item>
          <a-menu-item key="sub3">
            <router-link to="/library">
              <icon-font type="icon-library" class="sidebarfont" />归档库
            </router-link>
          </a-menu-item>
        </a-menu>-->
        <!-- :default-open-keys="['sub1']" -->
        <a-menu
          mode="inline"
          theme="light"
          :default-open-keys="['sub1']"
          style="height: 100%; background-color: #fcfcfd;"
        >
          <a-sub-menu key="sub1" @click="handleSelected1">
            <span slot="title">
              <icon-font type="icon-projectCount" class="sidebarfont" />项目管理
            </span>
            <template v-for="(v,i) in projectList">
              <a-menu-item :key="i" >{{v.name}}</a-menu-item>
            </template>
            <a-menu-item key="name">
              <a-button type="link" style="padding: 0px;" @click="showProject">
                <a-icon style="margin-right: 0px;" type="plus" />新建项目
              </a-button>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="sub2" @click="handleSelected2">
            <!-- <router-link to="/template"> -->
            <icon-font type="icon-template" class="sidebarfont" />模板库
            <!-- </router-link> -->
          </a-menu-item>
          <a-menu-item key="sub3" @click="handleSelected3">
            <!-- <router-link to="/library"> -->
            <icon-font type="icon-library" class="sidebarfont" />归档库
            <!-- </router-link> -->
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content
        :style="{ padding: '0 24px', minHeight: '280px', backgroundColor: '#fcfcfd' }"
      >
        <task-panel
          v-for="(v) in projectList"
          :key="v.id"
          :id="v.id"
          :title="v.name"
          :sub-title="v.describe"
          :templateId="v.templateId"
          :orgId = "v.orgId"
          :beginTime = "v.beginTime"
          :endTime = "v.endTime"
          v-show="menuChange == 'sub1'"
          @loadProject="loadProject"
          @sort="boards=>sortBoards(v.id, boards)"
        />
        <project-template
          v-show="menuChange == 'sub2'"
          :data="data"
          @loadTemplate="loadTemplate"
          @loadProject="loadProject"
        />
        <library
          v-show="menuChange == 'sub3'"
          :datalib="datalib"
          @loadLibrary="loadLibrary"
          @loadProject="loadProject"
        />
        <!-- :boards="v.template" -->
        <!-- <task-panel
          v-for="(v) in list"
          :key="v.id"
          :title="v.title"
          :sub-title="v.subTitle"
          :boards="v.boards"
          @sort="boards=>sortBoards(v.id,boards)"
        />-->
        <create-project-modal ref="project" @addProject="addProject" />

        <!-- <route-view></route-view> -->
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import TaskPanel from "./home/TaskPanel";
import CreateProjectModal from "./components/CreateProjectModal";
import * as item from "../request/item";
import ProjectTemplate from "./ProjectTemplate"
import Library from "./Library"
// import ph from "@/utils/placeholder";
// import uuid from "@/utils/uuid";
// import { mapGetters, mapMutations } from "vuex";
// import * as item from "@/request/item";

export default {
  components: {
    TaskPanel,
    CreateProjectModal,
    ProjectTemplate,
    Library
  },
  data: () => ({
    visibleProject: false,
    status: "1",
    statusLib: "2",
    menuChange: 'sub1',
    projectList: [],
    current: ['2'],
    defaultSelectedKeys: [],
    openKeys: [],
    data: [], //模板库请求数据
    datalib: [], //归档库请求数据
    dataall: [],
    // list:[]
    // list: new Array(5).fill(0).map(() => ({
    //   id: uuid(), // 项目 id
    //   title: ph(), // 标题
    //   subTitle: ph(), // 副标题
    //   boards: new Array(5).fill(0).map(() => ({
    //     title: ph(), // 标题
    //   })),
    // })),
  }),
  methods: {
    loadProject() {
      item.getProject().then(res => {
        this.projectList = res;
      });
    },
    loadTemplate(){
      item.getTemplate().then((res) => {
        this.data = res
    });
    },

    loadLibrary(){      
     item.getProject(this.statusLib).then((res) => {
       this.datalib = res
     })   
    },
    addProject(value) {
      const { name, templateId, orgId, beginTime, endTime, describe } = value;
      item
        .addProject({
          name,
          templateId,
          orgId,
          beginTime,
          endTime,
          describe
        })
        .then(() => {
          this.loadProject()
        })
        .catch(msg => this.message(msg));
    },
    sortBoards(id, arr) {
      if (this.list.find(v => v.id == id))
        this.list.find(v => v.id == id).boards = arr;
    },
    showProject() {
      this.$refs.project.visibleProject = true;
      this.$refs.project.loadDepart()
      this.$refs.project.loadCustomTemplate()
    },
    handleItem(name){
      console.log(name)
    },
    // onOpenChange (openKeys) {
    //   console.log(openKeys)
    //     this.openKeys = openKeys
    //   },
    //   updateMenu () {
    //     let routes = this.$route.matched.concat()
    //     this.defaultSelectedKeys = [ routes.pop().path ]
    //   },
      handleSelected1(){
        // console.log("点击了项目管理")
        this.menuChange = 'sub1'
      },
      handleSelected2(){
        // console.log("点击了模板库")
        this.menuChange = 'sub2'
        this.loadTemplate();
      },
      handleSelected3(){
        // console.log("点击了归档库")
        this.menuChange = 'sub3'
        this.loadLibrary()
      },
    // getInfo() {
    //   item.getProject().then((res) => {
    //     console.log(res)
    //     this.projectList = res
    //     console.log(this.projectList)
    //   })
    // }
  },

  mounted() {
    this.loadProject();
    this.loadTemplate();
    this.loadLibrary();
    // item.getAll().then((res) => {
    //   this.dataall = res
    //   console.log(res)
    // })
  }
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
.ant-menu >>> ul {
  background-color: #fcfcfd;
}
.bg {
  background-color: #fcfcfd;
}
</style>
