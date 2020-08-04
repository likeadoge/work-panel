<template>
  <a-card :bordered="false" :bodyStyle="{padding: '0px 8px', backgroundColor: '#fcfcfd'}">
    <a-table style="background-color: #fcfcfd;" :columns="columns" :dataSource="data" bordered :pagination="false">
      <span slot="name" slot-scope="text, records" style="font-color: #333333;">{{records.name}}</span>
      <span slot="describe" slot-scope="text, records" style="font-color: #999999;">{{records.describe}}</span>
      <span slot="createTime" slot-scope="text, records" style="font-color: #333333;">{{records.createTime}}</span>
      <template slot="operation" slot-scope="text, records">
        <a><icon-font type="icon-template" style="margin-right: 6px;"/>应用模板</a>
        <a-divider type="vertical"/>
        <a><icon-font type="icon-edit" style="margin-right: 6px;"/>重命名</a>
        <a-divider type="vertical"/>
        <a @click="delTemplate(records.id)"><icon-font type="icon-delete" style="margin-right: 6px;"/>删除</a>
      </template>
    </a-table>
    </a-card>
</template>

<script>
const columns = [
  {
    title: '项目模板',
    dataIndex: 'name',
    // width: '15%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '描述',
    dataIndex: 'describe',
    width: '40%',
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
]
import * as item from "../request/item"
export default {
  components: {
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
  methods: {
    showCell() {
      this.$refs.cell.visibleCell = true
    },
    delTemplate(){
      item.Deleteproject(id).then(()=> {
       this.$message.success("模板成功删除！")
       this.$emit('loadTemplate')
     }).catch(()=> {
       this.$message.warning(err)
     })
    }
  },
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