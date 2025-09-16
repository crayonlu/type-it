'use client';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

interface MarkdownRenderProps {
  content: string;
}

function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function rehypeHeadingIds() {
  return (tree: Element) => {
    visit(tree, 'element', (node: Element) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        const textContent = getTextContent(node);
        node.properties = node.properties || {};
        node.properties.id = generateHeadingId(textContent);
      }
    });
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTextContent(node: any): string {
  if (node.type === 'text') {
    return node.value;
  }
  if (node.children) {
    return node.children.map(getTextContent).join('');
  }
  return '';
}

export function MarkdownRender({ content }: MarkdownRenderProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const processMarkdown = async () => {
      try {
        const file = await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkRehype)
          .use(rehypeHeadingIds)
          .use(rehypePrettyCode, {
            theme: isDark ? 'github-dark-dimmed' : 'github-light',
            keepBackground: true,
            grid: true,
          })
          .use(rehypeStringify)
          .process(content);

        setHtmlContent(String(file));
      } catch (error) {
        console.error('Failed to process markdown:', error);
        setHtmlContent(content);
      }
    };

    if (content) {
      processMarkdown();
    }
  }, [content, isDark]);

  if (!htmlContent) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      className={`prose prose-lg w-full max-w-full ${
        isDark 
          ? 'dark:prose-invert prose-headings:text-white prose-p:text-white prose-strong:text-white prose-code:text-white prose-pre:bg-gray-100 prose-pre:text-gray-900' 
          : 'prose-headings:text-black prose-p:text-black prose-strong:text-black prose-code:text-black prose-pre:bg-gray-800 prose-pre:text-gray-100'
      }`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
