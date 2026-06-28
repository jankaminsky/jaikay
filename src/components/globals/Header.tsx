import React from 'react'
import type { Header as HeaderType } from '../../../payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageSwitcher } from '../LanguageSwitcher'

export const Header: React.FC<{ header: HeaderType; locale: string }> = ({ header, locale }) => {
  const { logo, navItems } = header

  const logoUrl = typeof logo === 'object' && logo?.url ? logo.url : ''
  const homePath = locale === 'en' ? '/' : `/${locale}`

  return (
    <header>
      <section className="max-w-[1440px] mx-auto py-10">
        <div className="flex justify-between items-center px-5 gap-5">
          {logoUrl ? (
            <Link href={homePath}>
              {/* Using standard img to avoid Next.js Image optimizer local fetching issues with Payload API URLs */}
              <img src={logoUrl} alt="JAIKAY DIGITAL CREATIVE STUDIO LOGO" width={180} height={50} className="max-h-[50px] w-auto" />
            </Link>
          ) : (
            <Link href={homePath} className="font-bold text-2xl tracking-tighter">JAIKAY</Link>
          )}
          <nav className="flex gap-4">
            {navItems?.map((item: any, i) => {
              // Resolve link destination based on reference type and locale
              let href = '#'
              if (item.type === 'reference') {
                if (typeof item.page === 'object' && item.page !== null) {
                  const slug = item.page.slug
                  if (slug === 'home' || slug === '/' || slug === 'index') {
                    href = locale === 'en' ? '/' : `/${locale}`
                  } else {
                    const normalizedSlug = slug.replace(/^\//, '')
                    href = locale === 'en' ? `/${normalizedSlug}` : `/${locale}/${normalizedSlug}`
                  }
                }
              } else {
                href = item.url || '#'
              }

              return (
                <Link 
                  key={i} 
                  href={href}
                  className="bg-black border border-black py-3 px-10 text-white font-mono no-underline transition-colors duration-100 ease-in hover:bg-white hover:text-black"
                >
                  {item.label}
                </Link>
              )
            })}
            <LanguageSwitcher />
          </nav>
        </div>
      </section>
    </header>
  )
}
