// 获取所有tag

import type { BlogCategory, BlogPost } from "@/types/blog";

function extractTags(configs: (BlogCategory | BlogPost)[]): string[] {
  let result: string[] = [];
  configs.forEach(item => {
    if (item.type === "post") {
      result.push(...item.tags);
    } else if (item.type === "category" && Array.isArray(item.children)) {
      result.push(...extractTags(item.children));
    }
  });
  return result;
}

export default extractTags;