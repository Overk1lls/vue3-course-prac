import { defineComponent } from "vue";

export default defineComponent({
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
