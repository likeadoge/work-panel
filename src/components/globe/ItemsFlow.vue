<template>
  <div
    class="fl"
    ref="cntr"
    :style="{
    gridTemplateColumns:`repeat(${n},1fr)`,
    gridGap:`${rowGap||'0'}px ${colGap||'0'}px`,
    margin:`${rowGap||'0'}px ${colGap||'0'}px`,
  }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: ["min", "max", "rowGap", "colGap"],
  data: () => ({
    cnWidth: 0,
  }),
  computed: {
    _min() {
      return this.min || 200;
    },
    _max() {
      return this.max || 100000000;
    },
    n() {
      if (this.cnWidth < this._min) return 1;
      const m = Math.floor(this.cnWidth / this._min);
      const c = Math.ceil(this.cnWidth / this._max);
      return c >= m ? c : m;
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      const resizeObserver = new ResizeObserver(() => {
        this.cnWidth = this.$refs.cntr.clientWidth;
      });
      resizeObserver.observe(this.$refs.cntr);
    });
  },
};
</script>

<style scoped>
.fl {
  display: grid;
}
</style>