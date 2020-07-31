<template>
  <a-modal :visible="visibleDel" title="提示" @cancel="()=> (this.visibleDel = false)" @ok="onSubmit">
    <a-form-model
      :model="form"
      :rules="rules"
      ref="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
    <p>确定将项目删除么？项目删除后不可恢复</p>
  </a-modal>
</template>

<script>
export default {
  data: () => ({
    visibleDel: false,
  }),
  methods: {
    onSubmit() {
      console.log("删除")
    }
  }
};
</script>
<style scoped>
</style>