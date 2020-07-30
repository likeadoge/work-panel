<template>
  <a-card :bordered="false" title="模板库">
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
</template>

<script>
import CreateProjectModal from "./components/CreateProjectModal"
import CreateBoardModal from "./components/CreateBoardModal"
import CustomTemplateModal from "./components/CustomTemplateModal"
import EditCellModal from "./components/EditCellModal"
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