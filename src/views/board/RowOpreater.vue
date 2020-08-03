<template>
  <div class="row-operate">
    <p>
      <a-button
        @click="rowUp"
        size="small"
        :ghost="true"
        type="primary"
        shape="circle"
        icon="arrow-up"
        style="margin-right:12px"
      />
      <!-- <a-button @click="rowTop" size="small" :ghost="true" type="primary" shape="round">置顶</a-button> -->
      <!-- <a-button @click="rowBottom" size="small" :ghost="true" type="primary" shape="round">底部</a-button> -->
      <!-- <a-button @click="rowCopy" size="small" :ghost="true" type="primary" shape="round">复制</a-button> -->
    </p>
    <p>
      <a-button
        @click="rowDown"
        size="small"
        :ghost="true"
        type="primary"
        shape="circle"
        icon="arrow-down"
        style="margin-right:12px"
      />
    </p>
    <p>
      <a-button
        @click="rowDelete"
        size="small"
        :ghost="true"
        type="primary"
        shape="circle"
        icon="delete"
        style="margin-right:12px"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["rowId"],
  methods: {
    rowUp() {
      this.$emit("rowUp", { rowId: this.rowId });
    },
    rowDown() {
      this.$emit("rowDown", { rowId: this.rowId });
    },
    rowTop() {
      this.$emit("rowTop", { rowId: this.rowId });
    },
    rowBottom() {
      this.$emit("rowBottom", { rowId: this.rowId });
    },
    rowDelete() {
      this.$emit("rowDelete", { rowId: this.rowId });
    },
    rowCopy() {
      this.$emit("rowCopy", { rowId: this.rowId });
    },
  },
};
</script>

<style scoped>
</style>