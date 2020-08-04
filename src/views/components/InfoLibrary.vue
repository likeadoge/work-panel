<template>
  <a-modal :visible="visibleLib" title="提示" @cancel="()=> (this.visibleLib = false)" @ok="onSubmit" cancelText="取消" okText="确定">
    <a-form-model>
    <p>确定将项目归档么？项目归档后可以在归档列表内撤销归档或彻底删除。</p>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  props: ['id'],
  data: () => ({
    visibleLib: false,
  }),
  methods: {
    onSubmit() {
      // console.log("归档")
      // debugger
      // console.log(this.id)
      this.$emit('exeLib', this.id)
      this.visibleLib = false
    }
  }
};
</script>
<style scoped>
</style>