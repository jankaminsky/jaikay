'use client'

import React, { useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  isBorder?: boolean
  as?: React.ElementType
}

export const FadeIn: React.FC<FadeInProps> = ({ children, className = '', isBorder = false, as: Component = 'div' }) => {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const appearOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.unobserve(entry.target)
      })
    }, appearOptions)

    if (ref.current) {
      appearOnScroll.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        appearOnScroll.unobserve(ref.current)
      }
    }
  }, [])

  let animationClasses = ''
  
  if (isBorder) {
    animationClasses = `relative border-t-0 border-b-0 after:content-[''] after:absolute after:left-0 after:top-0 after:h-[1px] after:bg-black after:transition-[width] after:duration-1000 after:ease-out ${isVisible ? 'after:w-full' : 'after:w-0'}`
  } else {
    animationClasses = `transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`
  }

  return (
    <Component ref={ref} className={`${animationClasses} ${className}`}>
      {children}
    </Component>
  )
}
