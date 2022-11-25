import { Post } from "@/models";

export interface Options {
  name: string;
  value: keyof Post;
}
