'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const LanguageSwitcher: React.FC = () => {
  const pathname = usePathname()

  // Determine current locale based on path prefix
  const isFr = pathname.startsWith('/fr/') || pathname === '/fr'

  // Calculate target paths
  const frPath = isFr ? pathname : `/fr${pathname === '/' ? '' : pathname}`
  const enPath = isFr ? (pathname.replace(/^\/fr/, '') || '/') : pathname

  return (
    <div className="flex items-center gap-2 font-mono text-sm ml-4">
      <Link 
        href={enPath} 
        className={`transition-colors hover:text-gray-500 ${!isFr ? 'font-bold underline' : ''}`}
      >
        EN
      </Link>
      <span>/</span>
      <Link 
        href={frPath} 
        className={`transition-colors hover:text-gray-500 ${isFr ? 'font-bold underline' : ''}`}
      >
        FR
      </Link>
    </div>
  )
}
