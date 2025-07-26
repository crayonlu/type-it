// home页个人信息的展示
import { avatar, introduction, nickname } from "@/config";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

export default function Info() {
  return (
    <main className="flex-1 flex gap-8 justify-center items-center">
      <section className="flex-1 justify-center items-center flex">
        <img 
          className="rounded-[50%] w-120"
        src={ avatar } alt="头像" />
      </section>
      <section className="flex-1 flex-col flex justify-center items-center">
        <h1 
          className="text-6xl font-bold italic font-mono"
        >{ nickname }</h1>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown 
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-medium mb-2" {...props} />,
              p: ({node, ...props}) => <p className="mb-4" {...props} />,
            }}
          >
            { introduction }
          </ReactMarkdown>
        </div>
      </section>
    </main>
  );
}
