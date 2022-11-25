<template>
  <select v-model="localModelValue" name="" id="">
    <option disabled value="">Choose sort method</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Options } from "@/models";

export default defineComponent({
  name: "MySelector",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array as PropType<Options[]>,
      default: () => [],
    },
  },
  computed: {
    localModelValue: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>
