'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const t = useTranslations('About');
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out',
        },
      );

      // Tech stack animation
      gsap.fromTo(
        techStackRef.current,
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8, 
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: techStackRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Stagger animation for tech badges
      gsap.fromTo(
        '.tech-badge',
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.1,
          delay: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: techStackRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const techCategories = [
    {
      title: t('TechStack.ProgrammingLanguages'),
      badges: [
        { name: 'JavaScript', color: 'bg-yellow-500', textColor: 'text-black' },
        { name: 'TypeScript', color: 'bg-blue-600', textColor: 'text-white' },
        { name: 'Python', color: 'bg-blue-500', textColor: 'text-white' },
        { name: 'C', color: 'bg-gray-500', textColor: 'text-white' },
      ],
    },
    {
      title: t('TechStack.FrontendFrameworks'),
      badges: [
        { name: 'Vue.js', color: 'bg-green-500', textColor: 'text-white' },
        { name: 'React', color: 'bg-cyan-400', textColor: 'text-black' },
        { name: 'Next.js', color: 'bg-black', textColor: 'text-white' },
        { name: 'Nuxt.js', color: 'bg-green-600', textColor: 'text-white' },
      ],
    },
    {
      title: t('TechStack.BackendRuntime'),
      badges: [
        { name: 'Node.js', color: 'bg-green-600', textColor: 'text-white' },
        { name: 'Bun', color: 'bg-black', textColor: 'text-white' },
        { name: 'Express.js', color: 'bg-black', textColor: 'text-white' },
      ],
    },
    {
      title: t('TechStack.Databases'),
      badges: [
        { name: 'MongoDB', color: 'bg-green-600', textColor: 'text-white' },
        { name: 'MySQL', color: 'bg-blue-600', textColor: 'text-white' },
      ],
    },
    {
      title: t('TechStack.DevOpsTools'),
      badges: [
        { name: 'Docker', color: 'bg-blue-500', textColor: 'text-white' },
        { name: 'Kubernetes', color: 'bg-blue-600', textColor: 'text-white' },
        { name: 'Vercel', color: 'bg-black', textColor: 'text-white' },
        { name: 'Nginx', color: 'bg-green-600', textColor: 'text-white' },
        { name: 'Linux', color: 'bg-yellow-500', textColor: 'text-black' },
        { name: 'Git', color: 'bg-orange-500', textColor: 'text-white' },
        { name: 'GitHub', color: 'bg-black', textColor: 'text-white' },
        { name: 'VS Code', color: 'bg-blue-500', textColor: 'text-white' },
        { name: 'Postman', color: 'bg-orange-500', textColor: 'text-white' },
      ],
    },
  ];

  return (
    <div ref={containerRef} className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div ref={headerRef} className='text-center mb-12'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-text mb-4'>
            {t('Title')}
          </h1>
          <p className='text-xl text-muted-foreground mb-2'>
            {t('Subtitle')}
          </p>
          <p className='text-lg text-muted-foreground'>
            {t('Role')}
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8'>

          {/* Tech Stack Section */}
          <div ref={techStackRef}>
            <Card className='h-fit'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <span className='text-2xl'>🛠️</span>
                  {t('TechStack.Title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                {techCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className='space-y-3'>
                    <h4 className='font-medium text-sm text-muted-foreground uppercase tracking-wide'>
                      {category.title}
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {category.badges.map((badge, badgeIndex) => (
                        <Badge
                          key={badgeIndex}
                          className={`tech-badge ${badge.color} ${badge.textColor} hover:scale-105 transition-transform duration-200`}
                          variant='secondary'
                        >
                          {badge.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}