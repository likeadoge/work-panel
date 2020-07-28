<template>
  <div class="about">
    <h1>{{name}}</h1>
    <div :style="{
      
    }">
    </div>
  </div>
</template>

<script>
import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";

export default {
  data: () => ({
    name: ph(),
    rows: new Array(5).fill(0).map(() => uuid()),
    cols: new Array(4).fill(0).map(() => uuid()),
  }),
};
</script>
