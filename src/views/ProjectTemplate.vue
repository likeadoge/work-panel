<template>
  <a-card :bordered="false" bodyStyle="padding: 0px 8px; background-color: #fcfcfd;">
    <a-table style="background-color: #fcfcfd;" :columns="columns" :dataSource="data" bordered :pagination="false">
      <span slot="name" slot-scope="text, record" style="font-color: #333333;">{{record.name}}</span>
      <span slot="describe" slot-scope="text, record" style="font-color: #999999;">{{record.describe}}</span>
      <span slot="createTime" slot-scope="text, record" style="font-color: #333333;">{{record.createTime}}</span>
      <template slot="operation">
        <a><icon-font type="icon-template" style="margin-right: 6px;"/>应用模板</a>
        <a-divider type="vertical"/>
        <a><icon-font type="icon-edit" style="margin-right: 6px;"/>重命名</a>
        <a-divider type="vertical"/>
        <a><icon-font type="icon-delete" style="margin-right: 6px;"/>删除</a>
      </template>
    </a-table>
      <!-- <a-button type="default" @click="showProject">新建项目弹框</a-button>
      <a-button type="default" @click="showBoard">新建看板弹框</a-button> -->
      <div style="margin-top: 48px"/>
      
      <a-button type="default" @click="showCell">卡片详情弹框</a-button>
      
      <edit-cell-modal ref="cell"/>
    </a-card>
</template>

<script>
// import CreateProjectModal from "./components/CreateProjectModal"
// import CreateBoardModal from "./components/CreateBoardModal"

import EditCellModal from "./components/EditCellModal"
// import * as item from "../request/item"

const columns = [
  {
    title: '项目模板',
    dataIndex: 'name',
    width: '15%',
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
    width: '316px',
    scopedSlots: { customRender: 'createTime' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '276px',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  components: {
     EditCellModal,
  },
  props: ["data"],
  data() {
    return {
      visibleProject: false,
      visibleBoard: false,
      
      visibleCell: false,
      columns,     
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
    
    showCell() {
      this.$refs.cell.visibleCell = true
    }
  },
  // mounted () {
  //   item.getTemplate().then((res) => {
  //     this.data = res
  //     // console.log(this.data)
  //   });
  // },
}

</script>
<style scoped>
.ant-card-body > button {
  margin-right: 8px;
}
.ant-table-content >>> div {
  background-color: blue;
}
</style>