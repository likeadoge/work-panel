<template>
  <div class="task-panel">
    <h3>{{title}}</h3>
    <p>{{subTitle}}</p>
  </div>
</template>

<script>
export default {
  props: ["title", "subTitle", "boards"],
};
</script>

<style scoped>
.task-panel{
    margin: 30px;
}
</style>


