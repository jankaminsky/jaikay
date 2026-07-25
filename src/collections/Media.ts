import type { CollectionConfig } from 'payload'
import { Buffer } from 'buffer'

// Helper to sanitize SharedArrayBuffer-backed Buffers (which cause undici fetch in Vercel Blob to fail)
const cleanBuffer = (buf: any): any => {
  if (!buf || !Buffer.isBuffer(buf)) return buf
  if (buf.buffer && typeof SharedArrayBuffer !== 'undefined' && buf.buffer instanceof SharedArrayBuffer) {
    const cleanArrayBuffer = new ArrayBuffer(buf.byteLength)
    const view = new Uint8Array(cleanArrayBuffer)
    view.set(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength))
    return Buffer.from(cleanArrayBuffer)
  }
  return buf
}

const sanitizeReqBuffers = ({ req }: { req: any }) => {
  if (!req) return
  if (req.file && req.file.data) {
    req.file.data = cleanBuffer(req.file.data)
  }
  if (req.file && req.file.sizes) {
    Object.keys(req.file.sizes).forEach((sizeKey) => {
      if (req.file.sizes[sizeKey] && req.file.sizes[sizeKey].data) {
        req.file.sizes[sizeKey].data = cleanBuffer(req.file.sizes[sizeKey].data)
      }
    })
  }
  if (req.payloadUploadSizes) {
    Object.keys(req.payloadUploadSizes).forEach((sizeKey) => {
      if (req.payloadUploadSizes[sizeKey] && req.payloadUploadSizes[sizeKey].data) {
        req.payloadUploadSizes[sizeKey].data = cleanBuffer(req.payloadUploadSizes[sizeKey].data)
      }
    })
  }
  if (req.context && req.context._payloadCloudStorage && req.context._payloadCloudStorage.file) {
    const f = req.context._payloadCloudStorage.file
    if (f.data) f.data = cleanBuffer(f.data)
    if (f.sizes) {
      Object.keys(f.sizes).forEach((sizeKey) => {
        if (f.sizes[sizeKey] && f.sizes[sizeKey].data) {
          f.sizes[sizeKey].data = cleanBuffer(f.sizes[sizeKey].data)
        }
      })
    }
  }
}

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
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ req }) => {
        sanitizeReqBuffers({ req })
      },
    ],
    beforeChange: [
      ({ req }) => {
        sanitizeReqBuffers({ req })
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}

