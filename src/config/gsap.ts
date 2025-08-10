import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);

export const animations = {
  // 淡入动画
  fadeIn: (element: string | Element, duration = 0.5, delay = 0) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration, delay, ease: 'power2.out' },
    );
  },

  // 滑入动画
  slideIn: (element: string | Element, direction = 'left', duration = 0.5, delay = 0) => {
    const startX = direction === 'left' ? -50 : direction === 'right' ? 50 : 0;
    const startY = direction === 'up' ? -50 : direction === 'down' ? 50 : 0;
    
    return gsap.fromTo(element,
      { opacity: 0, x: startX, y: startY },
      { opacity: 1, x: 0, y: 0, duration, delay, ease: 'power2.out' },
    );
  },

  // 缩放动画
  scaleIn: (element: string | Element, duration = 0.5, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' },
    );
  },

  // 旋转动画
  rotateIn: (element: string | Element, duration = 0.5, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, rotation: -180 },
      { opacity: 1, rotation: 0, duration, delay, ease: 'back.out(1.7)' },
    );
  },

  // 打字机效果
  typewriter: (element: string | Element, text: string, duration = 1, delay = 0) => {
    return gsap.to(element, {
      duration,
      delay,
      text: text,
      ease: 'none',
    });
  },

  // 弹跳动画
  bounce: (element: string | Element, duration = 0.6, delay = 0) => {
    return gsap.fromTo(element,
      { scale: 0 },
      { scale: 1, duration, delay, ease: 'bounce.out' },
    );
  },

  // 脉冲动画
  pulse: (element: string | Element, duration = 1, delay = 0) => {
    return gsap.to(element, {
      scale: 1.1,
      duration: duration / 2,
      delay,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });
  },

  // 摇摆动画
  wiggle: (element: string | Element, duration = 0.5, delay = 0) => {
    return gsap.to(element, {
      rotation: 10,
      duration: duration / 4,
      delay,
      yoyo: true,
      repeat: 3,
      ease: 'power2.inOut',
    });
  },

  // 优雅的淡入动画
  elegantFadeIn: (element: string | Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration, delay, ease: 'power3.out' },
    );
  },

  // 平滑滑入动画
  smoothSlideIn: (element: string | Element, direction = 'left', duration = 0.7, delay = 0) => {
    const startX = direction === 'left' ? -80 : direction === 'right' ? 80 : 0;
    const startY = direction === 'up' ? -80 : direction === 'down' ? 80 : 0;
    
    return gsap.fromTo(element,
      { opacity: 0, x: startX, y: startY, scale: 0.9 },
      { opacity: 1, x: 0, y: 0, scale: 1, duration, delay, ease: 'power3.out' },
    );
  },

  // 悬停效果
  hoverEffect: (element: string | Element) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    return tl;
  },

  // 点击效果
  clickEffect: (element: string | Element) => {
    return gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });
  },

  // 呼吸效果
  breathing: (element: string | Element, duration = 2) => {
    return gsap.to(element, {
      scale: 1.02,
      duration: duration / 2,
      yoyo: true,
      repeat: -1,
      ease: 'power2.inOut',
    });
  },

  // 渐变文字效果
  gradientText: (element: string | Element, duration = 2) => {
    return gsap.to(element, {
      backgroundPosition: '200% center',
      duration,
      ease: 'none',
      repeat: -1,
    });
  },
};

// 滚动触发动画
export const scrollAnimations = {
  // 滚动时淡入
  fadeInOnScroll: (element: string | Element, trigger = element, start = 'top 80%') => {
    return gsap.fromTo(element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger,
          start,
          toggleActions: 'play none none reverse',
        },
      },
    );
  },

  // 滚动时滑入
  slideInOnScroll: (element: string | Element, direction = 'left', trigger = element, start = 'top 80%') => {
    const startX = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
    const startY = direction === 'up' ? -100 : direction === 'down' ? 100 : 0;
    
    return gsap.fromTo(element,
      { opacity: 0, x: startX, y: startY },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger,
          start,
          toggleActions: 'play none none reverse',
        },
      },
    );
  },

  // 视差滚动
  parallax: (element: string | Element, speed = 0.5, trigger = element) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  },
};

// 时间轴动画
export const timelines = {
  // 创建序列动画
  sequence: (elements: (string | Element)[], stagger = 0.1, duration = 0.5) => {
    const tl = gsap.timeline();
    elements.forEach((element, index) => {
      tl.to(element, {
        opacity: 1,
        y: 0,
        duration,
        delay: index * stagger,
        ease: 'power2.out',
      }, index * stagger);
    });
    return tl;
  },

  // 创建交错动画
  stagger: (elements: string | Element, stagger = 0.1) => {
    return gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger,
        ease: 'power2.out',
      },
    );
  },
};

export const utils = {
  // 暂停所有动画
  pauseAll: () => gsap.globalTimeline.pause(),
  
  // 恢复所有动画
  resumeAll: () => gsap.globalTimeline.resume(),
  
  // 杀死所有动画
  killAll: () => gsap.killTweensOf('*'),
  
  // 获取GSAP版本
  getVersion: () => gsap.version,
};

export { gsap, ScrollTrigger, TextPlugin, MotionPathPlugin };

const gsapConfig = {
  gsap,
  animations,
  scrollAnimations,
  timelines,
  utils,
};

export default gsapConfig;