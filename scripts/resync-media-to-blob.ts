/**
 * Re-syncs local media files to Vercel Blob storage.
 *
 * This script reads each media document from the database, finds the
 * corresponding local file in public/media/, and re-uploads it through
 * Payload's API so the Vercel Blob storage plugin properly stores it.
 *
 * Usage (run against your production deployment):
 *   npx tsx scripts/resync-media-to-blob.ts
 *
 * Or call the API endpoint version instead (see /api/resync-media route).
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function resyncMedia() {
  const payload = await getPayload({ config: configPromise })

  const mediaDir = path.resolve(__dirname, '../public/media')

  // Fetch all media documents
  const { docs: mediaDocs } = await payload.find({
    collection: 'media',
    limit: 100,
  })

  console.log(`Found ${mediaDocs.length} media documents`)

  for (const doc of mediaDocs) {
    const filename = doc.filename
    if (!filename) {
      console.log(`  Skipping doc ${doc.id} — no filename`)
      continue
    }

    const localPath = path.join(mediaDir, filename)
    if (!fs.existsSync(localPath)) {
      console.log(`  Skipping "${filename}" — local file not found at ${localPath}`)
      continue
    }

    console.log(`  Re-uploading "${filename}" (id: ${doc.id})...`)

    try {
      const fileBuffer = fs.readFileSync(localPath)
      const file = {
        data: fileBuffer,
        mimetype: doc.mimeType || 'image/png',
        name: filename,
        size: fileBuffer.length,
      }

      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          alt: doc.alt || filename,
        },
        file,
      })

      console.log(`  ✅ "${filename}" re-uploaded successfully`)
    } catch (err) {
      console.error(`  ❌ Failed to re-upload "${filename}":`, err)
    }
  }

  console.log('\nDone! Media files should now be in Vercel Blob storage.')
  process.exit(0)
}

resyncMedia()
