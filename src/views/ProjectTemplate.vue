<template>
  <a-card :bordered="false">
    <a-table :columns="columns" :dataSource="data" bordered :pagination="false">
      <template slot="operation">
        <icon-font type="icon-template" style="margin-right: 6px;"/><a>应用模板</a>
        <a-divider type="vertical"/>
        <icon-font type="icon-edit" style="margin-right: 6px;"/><a>重命名</a>
        <a-divider type="vertical"/>
        <icon-font type="icon-delete" style="margin-right: 6px;"/><a>删除</a>
      </template>
    </a-table>
      <!-- <a-button type="default" @click="showProject">新建项目弹框</a-button>
      <a-button type="default" @click="showBoard">新建看板弹框</a-button> -->
      <div style="margin-top: 48px"/>
      <a-button type="default" @click="showTemplate">保存为自定义模板弹框</a-button>
      <a-button type="default" @click="showCell">卡片详情弹框</a-button>
      <a-button type="default">项目归档弹框</a-button>
      <a-button type="default">项目删除弹框</a-button> 
      <create-project-modal ref="project"/>
      <create-board-modal ref="board" /> 
      <custom-template-modal ref="template"/>  
      <edit-cell-modal ref="cell"/>
    </a-card>
</template>

<script>
// import CreateProjectModal from "./components/CreateProjectModal"
// import CreateBoardModal from "./components/CreateBoardModal"
import CustomTemplateModal from "./components/CustomTemplateModal"
import EditCellModal from "./components/EditCellModal"
import * as item from "../request/item"

const columns = [
  {
    title: '项目模板',
    dataIndex: 'name',
    // width: '25%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '描述',
    dataIndex: 'describe',
    // width: '15%',
    scopedSlots: { customRender: 'describe' },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    // width: '40%',
    scopedSlots: { customRender: 'createTime' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  components: {
    CustomTemplateModal, EditCellModal,
  },
  data() {
    return {
      visibleProject: false,
      visibleBoard: false,
      visibleTemplate: false,
      visibleCell: false,
      columns,
      data: []
    }
  },
  // mounted () {
  //   ;
  // },
  methods: {
    // showProject() {
    //   this.$refs.project.visibleProject = true
    // },
    // showBoard() {
    //   this.$refs.board.visibleBoard = true
    // },
    showTemplate() {
      this.$refs.template.visibleTemplate = true
    },
    showCell() {
      this.$refs.cell.visibleCell = true
    }
  },
  mounted () {
    item.getTemplate().then((res) => {
      this.data = res
      console.log(this.data)
    });
  },
}

</script>
<style scoped>
.ant-card-body > button {
  margin-right: 8px;
}
</style>