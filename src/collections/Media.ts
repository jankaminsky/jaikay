import type { CollectionConfig } from 'payload'
import { Buffer } from 'buffer'

// Helper to sanitize SharedArrayBuffer-backed Buffers (which cause undici fetch in Vercel Blob to fail)
const cleanBuffer = (buf: any): any => {
  if (!buf || !Buffer.isBuffer(buf)) return buf
  // Unconditionally copy to a clean, standalone ArrayBuffer to guarantee no SharedArrayBuffer is passed to undici
  const cleanArrayBuffer = new ArrayBuffer(buf.byteLength)
  const view = new Uint8Array(cleanArrayBuffer)
  view.set(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength))
  return Buffer.from(cleanArrayBuffer)
}

const sanitizeReqBuffers = ({ req }: { req: any }) => {
  if (!req) return
  if (req.file && req.file.data) {
    req.file.data = cleanBuffer(req.file.data)
  }
  if (req.file && req.file.sizes) {
    Object.keys(req.file.sizes).forEach((sizeKey) => {
      const val = req.file.sizes[sizeKey]
      if (!val) return
      if (Buffer.isBuffer(val)) {
        req.file.sizes[sizeKey] = cleanBuffer(val)
      } else if (val.data) {
        val.data = cleanBuffer(val.data)
      }
    })
  }
  if (req.payloadUploadSizes) {
    Object.keys(req.payloadUploadSizes).forEach((sizeKey) => {
      const val = req.payloadUploadSizes[sizeKey]
      if (!val) return
      if (Buffer.isBuffer(val)) {
        req.payloadUploadSizes[sizeKey] = cleanBuffer(val)
      } else if (val.data) {
        val.data = cleanBuffer(val.data)
      }
    })
  }
  if (req.context && req.context._payloadCloudStorage) {
    const ctxStorage = req.context._payloadCloudStorage
    if (ctxStorage.file && ctxStorage.file.data) {
      ctxStorage.file.data = cleanBuffer(ctxStorage.file.data)
    }
    if (ctxStorage.file && ctxStorage.file.sizes) {
      Object.keys(ctxStorage.file.sizes).forEach((sizeKey) => {
        const val = ctxStorage.file.sizes[sizeKey]
        if (!val) return
        if (Buffer.isBuffer(val)) {
          ctxStorage.file.sizes[sizeKey] = cleanBuffer(val)
        } else if (val.data) {
          val.data = cleanBuffer(val.data)
        }
      })
    }
    if (ctxStorage.uploadSizes) {
      Object.keys(ctxStorage.uploadSizes).forEach((sizeKey) => {
        const val = ctxStorage.uploadSizes[sizeKey]
        if (!val) return
        if (Buffer.isBuffer(val)) {
          ctxStorage.uploadSizes[sizeKey] = cleanBuffer(val)
        } else if (val.data) {
          val.data = cleanBuffer(val.data)
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

