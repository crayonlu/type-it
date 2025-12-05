'use client';

// home页个人信息的展示
import { avatar, nickname } from '@/config';
import { useEffect, useRef } from 'react';
import { animations } from '@/config/gsap';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MarkdownRender } from '@/components/blog/MarkdownRender';


interface InfoProps {
  introduction: string;
}

export default function Info({ introduction }: InfoProps) {
  const avatarRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Common');

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
    <main className="flex-1 flex flex-col-reverse lg:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
      <section className="flex-1 justify-center items-center flex order-2 lg:order-1">
        <Image 
          ref={avatarRef}
          className="rounded-[50%] w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-120 xl:h-120 opacity-0"
          src={avatar} 
          alt={t('Avatar')} 
          width={480}
          height={480}
          priority
        />
      </section>
      <section className="flex-1 flex-col flex justify-center items-center gap-4 sm:gap-6 lg:gap-8 order-1 lg:order-2 text-center lg:text-left">
        <h1 
          ref={nameRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic font-mono opacity-0"
        >{ nickname }</h1>
        <div 
          ref={introRef}
          className="opacity-0 tracking-wide sm:tracking-wider lg:tracking-widest max-w-sm sm:max-w-md lg:max-w-none"
        >
          <MarkdownRender content={introduction} />
        </div>
      </section>
    </main>
  );
}
