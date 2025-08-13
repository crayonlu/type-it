'use client';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { useEffect, useState } from 'react';

interface MarkdownRenderProps {
  content: string;
}

export function MarkdownRender({ content }: MarkdownRenderProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    const processMarkdown = async () => {
      try {
        const file = await unified()
          .use(remarkParse)
          .use(remarkRehype)
          .use(rehypePrettyCode, {
            theme: 'github-dark-dimmed',
            keepBackground: false,
            grid: true,
          })
          .use(rehypeStringify)
          .process(content);

        setHtmlContent(String(file));
      } catch (error) {
        // 
        console.error('Failed to process markdown:', error);
        setHtmlContent(content);
      }
    };

    if (content) {
      processMarkdown();
    }
  }, [content]);

  if (!htmlContent) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
