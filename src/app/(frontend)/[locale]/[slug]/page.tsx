import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'
import React from 'react'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params
  
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    locale: locale as 'en' | 'fr',
    collection: 'pages',
    where: {
      or: [
        { slug: { equals: slug } },
        { slug: { equals: `/${slug}` } },
      ],
    },
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    return {}
  }

  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description,
    openGraph: {
      title: page.meta?.title || page.title,
      description: page.meta?.description || undefined,
      images: page.meta?.image ? [{ url: typeof page.meta.image === 'object' ? page.meta.image.url || '' : page.meta.image }] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
  })

  const params: { locale: string; slug: string }[] = []
  
  for (const page of pages.docs) {
    const normalizedSlug = page.slug?.replace(/^\//, '') || ''
    // Generate static params for both locales
    params.push({ locale: 'en', slug: normalizedSlug })
    params.push({ locale: 'fr', slug: normalizedSlug })
  }

  return params
}

export default async function Page({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { slug, locale } = await params
  
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    locale: locale as 'en' | 'fr',
    collection: 'pages',
    where: {
      or: [
        { slug: { equals: slug } },
        { slug: { equals: `/${slug}` } },
      ],
    },
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    return notFound()
  }

  return <RenderBlocks blocks={page.layout} />
}
