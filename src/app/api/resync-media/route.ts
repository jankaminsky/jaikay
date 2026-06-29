import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * GET /api/resync-media
 *
 * Re-uploads all media documents through Payload's update API
 * so the Vercel Blob storage plugin stores them properly.
 *
 * This fixes 500 errors when media was uploaded before the blob plugin
 * was active, or was seeded directly without going through the plugin.
 *
 * The script fetches local files from the public/ directory via HTTP
 * (since fs access is unreliable on Vercel serverless) and re-uploads
 * them through Payload so the Blob adapter intercepts the write.
 *
 * ⚠️ DELETE THIS ROUTE after running it once in production.
 */
export async function GET(request: Request) {
  // Basic security: require a secret query param
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')

  if (secret !== (process.env.PAYLOAD_SECRET || '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })
  const origin = url.origin // e.g. https://www.jaikay.com

  const { docs: mediaDocs } = await payload.find({
    collection: 'media',
    limit: 100,
  })

  const results: Array<{
    id: string
    filename: string
    status: string
    error?: string
    newUrl?: string
  }> = []

  for (const doc of mediaDocs) {
    const filename = doc.filename
    if (!filename) {
      results.push({ id: String(doc.id), filename: 'unknown', status: 'skipped', error: 'no filename' })
      continue
    }

    const currentUrl = doc.url || ''

    // Skip if already on blob storage
    if (currentUrl.includes('blob.vercel-storage.com')) {
      results.push({ id: String(doc.id), filename, status: 'skipped', error: 'already on blob storage' })
      continue
    }

    try {
      // Fetch the file from the public/ directory via HTTP
      // Files in public/ are served as static assets at /filename
      const fileUrl = `${origin}/media/${filename}`
      const response = await fetch(fileUrl)

      if (!response.ok) {
        results.push({
          id: String(doc.id),
          filename,
          status: 'error',
          error: `Failed to fetch from ${fileUrl}: ${response.status} ${response.statusText}`,
        })
        continue
      }

      const arrayBuffer = await response.arrayBuffer()
      const fileBuffer = Buffer.from(arrayBuffer)

      const file = {
        data: fileBuffer,
        mimetype: doc.mimeType || 'image/png',
        name: filename,
        size: fileBuffer.length,
      }

      const updated = await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          alt: doc.alt || filename,
        },
        file,
      })

      results.push({
        id: String(doc.id),
        filename,
        status: 'success',
        newUrl: updated.url || undefined,
      })
    } catch (err) {
      results.push({
        id: String(doc.id),
        filename,
        status: 'error',
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }

  return NextResponse.json({
    message: `Processed ${mediaDocs.length} media documents`,
    results,
  })
}
