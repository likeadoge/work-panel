<template>
  <div>
    <div class="panel card">
      <div class="item border-card" v-for="(v,i) in items" :key="i">{{v.content}}</div>
      <a-button type="link" icon="plus" @click="add">添加新的卡片</a-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["rowId", "colId", "items"],
  methods: {
    add() {
      this.$emit("add", { rowId: this.rowId, colId: this.colId });
    },
  },
};
</script>
<style scoped>

.card {
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.01);
  transition: all 0.3s ease-out;
  padding: 8px;
}

.border-card {
  border: 1px solid #dee0e3;
  border-radius: 6px;
  padding:4px 8px;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.item{
    margin-bottom: 8px;
}
</style>