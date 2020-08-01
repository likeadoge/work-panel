<template>
  <div style="padding: 24px;">
    <a-table :columns="columns" :data-source="data" bordered :pagination="false">
      <template slot="operation">
        <a>应用模板</a>
        <a-divider type="vertical"/>
        <a>重命名</a>
        <a-divider type="vertical"/>
        <a>删除</a>
      </template>
    </a-table>





    <a-card :bordered="false" title="模板库" style="margin-top: 48px;">
    <a-button type="default" @click="showProject">新建项目弹框</a-button>
    <a-button type="default" @click="showBoard">新建看板弹框</a-button>
    <a-button type="default" @click="showTemplate">保存为自定义模板弹框</a-button>
    <a-button type="default" @click="showCell">卡片详情弹框</a-button>
    <a-button type="default">项目归档弹框</a-button>
    <a-button type="default">项目删除弹框</a-button> 
    <create-project-modal ref="project"/>
    <create-board-modal ref="board" /> 
    <custom-template-modal ref="template"/>  
    <edit-cell-modal ref="cell"/>
  </a-card>
  </div>
  
</template>

<script>
import CreateProjectModal from "./components/CreateProjectModal"
import CreateBoardModal from "./components/CreateBoardModal"
import CustomTemplateModal from "./components/CustomTemplateModal"
import EditCellModal from "./components/EditCellModal"

const columns = [
  {
    title: '项目模板',
    dataIndex: 'name',
    // width: '25%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '描述',
    dataIndex: 'desc',
    // width: '15%',
    scopedSlots: { customRender: 'desc' },
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
const data = [
  {
    name: 'idata',
    desc: '测试项目描述',
    createTime: '2020-08-01 17:02'
  }
]
export default {
  components: {
    CreateProjectModal, CreateBoardModal, CustomTemplateModal, EditCellModal,
  },
  data() {
    return {
      visibleProject: false,
      visibleBoard: false,
      visibleTemplate: false,
      visibleCell: false,
      columns,
      data
    }
  },
  methods: {
    showProject() {
      this.$refs.project.visibleProject = true
    },
    showBoard() {
      this.$refs.board.visibleBoard = true
    },
    showTemplate() {
      this.$refs.template.visibleTemplate = true
    },
    showCell() {
      this.$refs.cell.visibleCell = true
    }
  },
}

</script>
<style scoped>
.ant-card-body > button {
  margin-right: 8px;
}
</style>