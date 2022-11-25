<template>
  <input
    :value="modelValue"
    @input="updateInput"
    class="my-input"
    type="text"
    name=""
    id=""
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyInput",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(e: Event) {
      const el = e.target as HTMLInputElement;
      this.$emit("update:modelValue", el.value);
    },
  },
});
</script>
