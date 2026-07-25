import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: process.env.NODE_ENV === 'production' ? '/tmp' : 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        position: 'centre',
      },
    ],
    // Include 'text/plain' because during Vercel Blob clientUploads, server-side buffer detection
    // receives an empty buffer and falls back to getFileTypeFallback, which defaults to 'text/plain'.
    mimeTypes: ['image/*', 'text/plain'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
