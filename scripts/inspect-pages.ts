import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  const pagesEn = await payload.find({
    collection: 'pages',
    locale: 'en',
    limit: 100,
  })
  const pagesFr = await payload.find({
    collection: 'pages',
    locale: 'fr',
    limit: 100,
  })

  console.log('--- PAGES EN ---')
  console.log(JSON.stringify(pagesEn.docs, null, 2))
  console.log('--- PAGES FR ---')
  console.log(JSON.stringify(pagesFr.docs, null, 2))
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
