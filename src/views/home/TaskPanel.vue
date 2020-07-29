<template>
  <div class="task-panel">
    <h3>{{title}}</h3>
    <p>{{subTitle}}</p>
    <div class="board-cntr">
      <div class="board" v-for="v in boards" :key="v.id">{{v.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "subTitle", "boards"],
};
</script>

<style scoped>
.task-panel {
  margin: 30px;
}
.board {
  height: 100px;
  background: lightslategray;
}
.board-cntr{
    display: grid;
    gap: 20px 20px;
    grid-template-columns: repeat(auto-fit, minmax(200px,1fr))
}
</style>


