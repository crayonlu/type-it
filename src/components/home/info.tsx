'use client'

// home页个人信息的展示
import { avatar, nickname, getIntroduction } from "@/config";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";
import { animations } from "@/config/gsap";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function Info() {
  const avatarRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Common");
  const locale = useLocale();
  const [introduction, setIntroduction] = useState<string>("");

  useEffect(() => {
    const loadIntroduction = async () => {
      try {
        const intro = await getIntroduction(locale);
        setIntroduction(intro);
      } catch (error) {
        console.error('Failed to load introduction:', error);
        const { default: fallbackIntro } = await import('@/config/markdown/introduction.en.md');
        setIntroduction(fallbackIntro);
      }
    };

    loadIntroduction();
  }, [locale]);

  useEffect(() => {
    // 头像缩放
    if (avatarRef.current) {
      animations.elegantFadeIn(avatarRef.current, 1, 0.3);
      
      // hover
      const hoverTl = animations.hoverEffect(avatarRef.current);
      avatarRef.current.addEventListener('mouseenter', () => hoverTl.play());
      avatarRef.current.addEventListener('mouseleave', () => hoverTl.reverse());
    }

    // 名字平滑滑入
    if (nameRef.current) {
      animations.smoothSlideIn(nameRef.current, 'left', 0.8, 0.6);
      
      // 添加悬停
      const hoverTl = animations.hoverEffect(nameRef.current);
      nameRef.current.addEventListener('mouseenter', () => hoverTl.play());
      nameRef.current.addEventListener('mouseleave', () => hoverTl.reverse());
    }

    // 介绍文字淡入
    if (introRef.current) {
      animations.elegantFadeIn(introRef.current, 1, 0.9);
    }
  }, []);

  return (
    <main className="flex-1 flex gap-8 justify-center items-center">
      <section className="flex-1 justify-center items-center flex">
        <img 
          ref={avatarRef}
          className="rounded-[50%] w-120 opacity-0"
          src={ avatar } alt={t("Avatar")} />
      </section>
      <section className="flex-1 flex-col flex justify-center items-center gap-8">
        <h1 
          ref={nameRef}
          className="text-6xl font-bold italic font-mono opacity-0"
        >{ nickname }</h1>
        <div 
          ref={introRef}
          className="prose max-w-none opacity-0 tracking-widest"
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw,remarkGfm]}>
            { introduction }
          </ReactMarkdown>
        </div>
      </section>
    </main>
  );
}
