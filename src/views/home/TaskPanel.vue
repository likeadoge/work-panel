<template>
  <div class="task-panel">
    <h3>{{title}}</h3>
    <p>{{subTitle}}</p>
      <draggable
        v-model="list"
         class="board-cntr"
        :element="'div'"
        :ghostClass="'board-card-ghost'"
        style="padding-bottom:16px"
        :filter="'.board-add'"
        :draggable="'.board'"
      >
        <!-- :group="{name:'board-card'}" -->
      <div class="board border-card" v-for="v in boards" :key="v.id">{{v.title}}</div>
      <div class="board-add border-card" >添加新看板</div>
      </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  props: ["title", "subTitle", "boards"],
  computed: {
    list: {
      get() {
        return this.boards;
      },
      set(arr) {
        this.$emit('sort',arr);
      },
    },
  },
};
</script>

<style scoped>
.task-panel {
  margin: 30px;
  margin-bottom: 100px;
}
.board {
  height: 100px;
}
.board-add {
  height: 100px;
  border-style: dashed!important;
}
.board-cntr {
  display: grid;
  gap: 20px 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.board-card-ghost{
  opacity: 0.5;
}
</style>


