"use client"

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { cn } from '@/lib/utils'

interface MarkdownRenderProps {
  content: string
  className?: string
}

export function MarkdownRender({ content, className }: MarkdownRenderProps) {
  return (
    <div className={cn("prose prose-lg max-w-none dark:prose-invert", className)}>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          [remarkToc, { tight: true, maxDepth: 6 }]
        ]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { 
            behavior: 'wrap',
            properties: { className: ['anchor-link'] }
          }],
          rehypeRaw
        ]}
        components={{
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            if (inline || !match) {
              return <code {...props}>{children}</code>
            }
            
            let codeString = ''
            
            if (node && node.children && node.children.length > 0) {
              const firstChild = node.children[0]
              if (firstChild && typeof firstChild.value === 'string') {
                codeString = firstChild.value
              } else if (firstChild && firstChild.children && firstChild.children.length > 0) {
                codeString = firstChild.children.map((child: any) => 
                  child.value || child.children?.map((c: any) => c.value).join('') || ''
                ).join('')
              }
            }
            
            codeString = codeString.trimEnd()

            return (
              <SyntaxHighlighter
                language={match[1]}
                style={tomorrow}
                className="rounded-lg"
                customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem', lineHeight: '1.5' }}
                PreTag={({ children, ...preProps }) => (
                  <pre className="overflow-x-auto rounded-lg bg-muted p-4 my-4 text-sm" {...preProps}>
                    {children}
                  </pre>
                )}
              >
                {codeString}
              </SyntaxHighlighter>
            )
          },
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table {...props}>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
