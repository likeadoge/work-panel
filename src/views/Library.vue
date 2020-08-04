<template>
  <a-card :bordered="false" bodyStyle="padding: 0px 8px; background-color: #fcfcfd;">
    <a-table :columns="columns" :data-source="data" bordered :pagination="false">
      <template slot="operation">
        <a><icon-font type="icon-restore" style="margin-right: 6px;"/>还原</a>        
        <a-divider type="vertical"/>
        <a><icon-font type="icon-delete" style="margin-right: 6px;"/>删除</a>
      </template>
    </a-table>    
  </a-card>
  
</template>

<script>
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
    title: '归档时间',
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
 data() {
   return {
     columns,
     data: [],
     status: 2
   }
 },
 methods: {
   loadLibrary() {
     item.getProject(this.status).then((res) => {
       this.data = res
     })
   }
 },
 mounted () {
   this.loadLibrary();
 },
}

</script>
<style scoped>
</style>