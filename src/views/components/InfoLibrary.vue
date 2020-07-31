<template>
  <a-modal :visible="visibleLib" title="提示" @cancel="()=> (this.visibleLib = false)" @ok="onSubmit">
    <a-form-model
      :model="form"
      :rules="rules"
      ref="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
    <p>确定将项目归档么？项目归档后可以在归档列表内撤销归档或彻底删除。</p>
  </a-modal>
</template>

<script>
export default {
  data: () => ({
    visibleLib: false,
  }),
  methods: {
    onSubmit() {
      console.log("归档")
    }
  }
};
</script>
<style scoped>
</style>