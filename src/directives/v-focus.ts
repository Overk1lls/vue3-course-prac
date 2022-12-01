import { Directive } from "vue";

export default <Directive<HTMLElement>>{
  name: "focus",
  mounted(el) {
    el.focus();
  },
};
