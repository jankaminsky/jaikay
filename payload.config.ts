import { buildConfig } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { Header } from './src/globals/Header'
import { Footer } from './src/globals/Footer'
import { SiteSettings } from './src/globals/SiteSettings'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages],
  globals: [Header, Footer, SiteSettings],
  sharp,
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'a-very-secret-key-change-in-production-1234567890',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Jaikay | ${doc?.title ? String(doc.title) : 'Untitled'}`,
      generateDescription: ({ doc }) => doc?.excerpt ? String(doc.excerpt) : '',
      generateURL: ({ doc }) => `https://jaikay.com/${doc?.slug ? String(doc.slug) : ''}`,
    }),
    vercelBlobStorage({
      enabled: process.env.NODE_ENV === 'production',
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1/jaikay',
  }),
  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    fallback: true,
  },
})
