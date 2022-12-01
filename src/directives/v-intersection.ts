import { Directive } from "vue";
import { Pagination } from "@/models";

const postsLimit = 100;

export default <Directive<HTMLDivElement, () => Promise<void>>>{
  name: "intersection",
  mounted(element, binding) {
    const { page, limit } = binding.arg as unknown as Pagination;

    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting && page < Math.ceil(postsLimit / limit)) {
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);
  },
};
