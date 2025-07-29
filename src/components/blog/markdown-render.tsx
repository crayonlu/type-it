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
          h1: ({ children, id, ...props }) => (
            <h1 id={id} className="scroll-mt-20 text-3xl font-bold tracking-tight text-foreground border-b border-border pb-2 mb-6" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, id, ...props }) => (
            <h2 id={id} className="scroll-mt-20 text-2xl font-semibold tracking-tight text-foreground border-b border-border pb-1 mb-4 mt-8" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, id, ...props }) => (
            <h3 id={id} className="scroll-mt-20 text-xl font-semibold tracking-tight text-foreground mb-3 mt-6" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, id, ...props }) => (
            <h4 id={id} className="scroll-mt-20 text-lg font-semibold tracking-tight text-foreground mb-2 mt-5" {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, id, ...props }) => (
            <h5 id={id} className="scroll-mt-20 text-base font-semibold tracking-tight text-foreground mb-2 mt-4" {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, id, ...props }) => (
            <h6 id={id} className="scroll-mt-20 text-sm font-semibold tracking-tight text-foreground mb-2 mt-3" {...props}>
              {children}
            </h6>
          ),
          p: ({ children, ...props }) => (
            <p className="leading-7 text-foreground mb-4" {...props}>{children}</p>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-primary bg-muted/50 pl-4 py-2 my-4 italic text-muted-foreground" {...props}>
              {children}
            </blockquote>
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            if (inline || !match) {
              return (
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground" {...props}>
                  {children}
                </code>
              )
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
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-foreground" {...props}>{children}</ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground" {...props}>{children}</ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-foreground" {...props}>{children}</li>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4"><table className="min-w-full border-collapse border border-border" {...props}>{children}</table></div>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border bg-muted px-4 py-2 text-left font-semibold text-foreground" {...props}>{children}</th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-4 py-2 text-foreground" {...props}>{children}</td>
          ),
          a: ({ children, href, ...props }) => (
            <a href={href} className="underline underline-offset-4 transition-colors" {...props}>
              {children}
            </a>
          ),
          img: ({ src, alt, ...props }) => (
            <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-4 shadow-sm" {...props} />
          ),
          hr: ({ ...props }) => <hr className="border-border my-8" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
