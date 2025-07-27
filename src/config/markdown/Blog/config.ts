// 博客页配置文件

interface BlogPost {
  // 类型
  type: 'post';
  // 标题
  title: string;
  // 描述/简介
  desc: string;
  // 封面:可以用uri/url
  cover: string;
  // 时间戳
  time: number;
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

const BASE = '@/config/markdown/Blog'

const blog_configs: BlogCategory[] = [
  {
    type: 'category',
    name: '前端',
    children: []
  },
  {
    type: 'category',
    name: '点子池',
    children: []
  },
  {
    type: 'category',
    name: '生活',
    children: []
  },
  {
    type: 'category',
    name: '算法与数据结构',
    children: []
  },
  {
    type: 'category',
    name: '我爱看电影',
    children: []
  },
  {
    type: 'category',
    name: '我爱看番',
    children: []
  },
];

export default blog_configs;