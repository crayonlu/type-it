interface BlogPost {
  // 类型
  type: 'post';
  // 标题
  title: string;
  // 描述/简介
  desc: string;
  // 封面:可以用uri/url
  cover?: string;
  // 时间
  time: string;
  // 位置
  docs: string;
  // 标签
  tags: string[];
}

interface BlogCategory {
  // 类型
  type: 'category';
  // 名字
  name: string;
  // 孩子:可以是post/子分类
  children: (BlogPost | BlogCategory)[]; 
}

interface BlogPostProps{
  // 标题
  title: string;
  // 描述/简介
  desc: string;
  // 封面:可以用uri/url
  cover?: string;
  // 时间
  time: string;
  // 标签
  tags: string[];
}

type CategoryNode = {
  name: string;
  children: CategoryNode[];
};

const BLOG_DOCS_BASE = '@/config/docs/Blog'
const BLOG_IMG_BASE = '/images/Blog'

export type { BlogPost, BlogCategory, BlogPostProps, CategoryNode};
export { BLOG_DOCS_BASE, BLOG_IMG_BASE}