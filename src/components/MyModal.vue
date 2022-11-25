<template>
  <div class="dialog" v-if="isVisible" @click="hide">
    <div @click.stop class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyModal",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hide() {
      this.$emit("update:isVisible", false);
    },
  },
});
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog-content {
  margin: auto;
  background: white;
  border-radius: 12px;
  padding: 20px;
}
</style>
