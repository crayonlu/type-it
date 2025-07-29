"use client"

import React, { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ReadingProgressProps {
  className?: string
  showPercentage?: boolean
  height?: string
}

export function ReadingProgress({ 
  className, 
  showPercentage = false, 
  height = "h-1" 
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      
      const newProgress = Math.min(Math.max(scrollPercent, 0), 100)
      setProgress(newProgress)
      
      setIsVisible(newProgress > 10)
    }

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress)
    }

    calculateProgress()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', calculateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateProgress)
    }
  }, [])

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-opacity duration-300",
      isVisible ? "opacity-100" : "opacity-0",
      className
    )}>
      <div className="relative">
        <Progress 
          value={progress} 
          className={cn(
            "rounded-none bg-background/80 backdrop-blur-sm border-b border-border/50",
            height
          )}
        />
        {showPercentage && (
          <div className="absolute top-2 right-4 text-xs text-muted-foreground bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md border border-border/50 shadow-sm">
            {Math.round(progress)}%
          </div>
        )}
      </div>
    </div>
  )
}