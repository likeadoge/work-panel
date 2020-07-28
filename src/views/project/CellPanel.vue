<template>
  <div>
    <div class="panel card">
      <draggable
        v-model="list"
        :element="'div'"
        :ghostClass="'work-card-ghost'"
        :group="{name:'card'}"
        style="padding-bottom:16px"
      >
        <div class="item border-card" v-for="(v,i) in items" :key="i">{{v.content}}</div>
      </draggable>
      <div style="margin-top:-16px">
        <a-button type="link" icon="plus" @click="add">添加新的卡片</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  props: ["rowId", "colId", "items"],
  computed: {
    list: {
      get() {
        return this.items.map((v) => v).sort((a, b) => a.sort - b.sort);
      },
      set(items) {
        this.$emit("update", {
          rowId: this.rowId,
          colId: this.colId,
          items,
        });
      },
    },
  },
  methods: {
    add() {
      this.$emit("add", {
        rowId: this.rowId,
        colId: this.colId,
        sort:
          this.list.length === 0 ? 0 : this.list[this.list.length - 1].sort + 1,
      });
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
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.item {
  margin-bottom: 8px;
}

.work-card-ghost {
  opacity: 0.5;
}
</style>