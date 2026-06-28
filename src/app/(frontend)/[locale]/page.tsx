import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'
import React from 'react'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })
  
  const { docs } = await payload.find({
    locale: locale as 'en' | 'fr',
    collection: 'pages',
    where: {
      or: [
        { slug: { equals: 'home' } },
        { slug: { equals: '/' } },
        { slug: { equals: 'index' } },
      ]
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })
  
  const { docs } = await payload.find({
    locale: locale as 'en' | 'fr',
    collection: 'pages',
    where: {
      or: [
        { slug: { equals: 'home' } },
        { slug: { equals: '/' } },
        { slug: { equals: 'index' } },
      ]
    },
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    return notFound()
  }

  return <RenderBlocks blocks={page.layout} />
}
