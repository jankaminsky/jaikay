import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  const headerEn = await payload.findGlobal({ slug: 'header', locale: 'en' })
  const headerFr = await payload.findGlobal({ slug: 'header', locale: 'fr' })
  console.log('Header (EN):', JSON.stringify(headerEn, null, 2))
  console.log('Header (FR):', JSON.stringify(headerFr, null, 2))
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
