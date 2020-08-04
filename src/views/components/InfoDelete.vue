<template>
  <a-modal :visible="visibleDel" title="提示" @cancel="()=> (this.visibleDel = false)" @ok="onSubmit" cancelText="取消" okText="确定">
    <a-form-model>
    <p>确定将项目删除么？项目删除后不可恢复</p>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  props: ['id'],
  data: () => ({
    visibleDel: false,
  }),
  methods: {
    onSubmit() {
      // console.log("删除")
      // console.log(this.id)
      this.$emit('exeDel', this.id)
      this.visibleDel = false
    }
  }
};
</script>
<style scoped>
</style>