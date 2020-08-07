<template>
  <a-card :bordered="false" :bodyStyle="{padding: '0px 8px', backgroundColor: '#fcfcfd'}">
    <a-table :columns="columns" :data-source="datalib" bordered :pagination="false">
      <template slot="operation" slot-scope="text, records">
        <a @click="retProject(records.id)"><icon-font type="icon-restore" style="margin-right: 6px;"/>还原</a>        
        <a-divider type="vertical"/>
        <a @click="delProject(records.id)"><icon-font type="icon-delete" style="margin-right: 6px;"/>删除</a>
      </template>
    </a-table>    
  </a-card>
  
</template>

<script>
import * as item from "../request/item"
const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    width: '25%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '描述',
    dataIndex: 'describe',
    width: '40%',
    scopedSlots: { customRender: 'describe' },
  },
  {
    title: '归档时间',
    dataIndex: 'updateTime',
    width: '316px',
    align: 'center',
    scopedSlots: { customRender: 'updateTime' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '276px',
    align: 'center',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  props: ["datalib"],
 data() {
   return {
     columns,
   }
 },
 methods: {
   delProject(id) {
     item.Deleteproject(id).then(()=> {
       this.$message.success("项目成功删除！")
       this.$emit('loadLibrary')
     }).catch(()=> {
       this.$message.warning(err)
     })
   },
   retProject(id){
     item.Returnproject(id).then(()=> {
       this.$message.success("项目已还原！")
       this.$emit('loadLibrary')
       this.$emit('loadProject')
     }).catch(()=> {
       this.$message.warning(err)
     })
   }
 },
}

</script>
<style scoped>
</style>