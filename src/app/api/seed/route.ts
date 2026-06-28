// @ts-nocheck
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({ collection: 'pages', locale: 'all', limit: 100 })
  
  for (const page of pages.docs) {
    if (!page.slug?.fr && page.slug?.en) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        locale: 'fr',
        data: {
          slug: page.slug.en,
          title: page.title?.en || '',
        },
      })
    }
  }

  return NextResponse.json({ success: true })
}
