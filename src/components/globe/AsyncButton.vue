<template>
  <a-button
    :disabled="disabled"
    :ghost="ghost"
    :htmlType="htmlType"
    :icon="icon"
    :loading="loading"
    :shape="shape"
    :size="size"
    :block="block"
    :type="type"
    @click="(...arg)=>click(...arg)"
  >
    <slot></slot>
  </a-button>
</template>

<script>
export default {
  props: [
    "disabled",
    "ghost",
    "htmlType",
    "icon",
    "shape",
    "size",
    "type",
    "block",
  ],
  data: () => ({
    loading: false,
  }),
  methods: {
    click(...arg) {
      this.loading = true;
      this.$emit(
        "click",
        (r) => {
          if (r && r instanceof Promise) {
            r.finally(() => {
              this.loading = false;
            });
          } else {
            this.loading = false;
          }
        },
        ...arg
      );
    },
  },
};
</script>

<style>
</style>