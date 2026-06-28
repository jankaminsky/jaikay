import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })

  // Find the contact page
  const { docs: contactPages } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'contact' },
    },
    depth: 0,
  })

  if (contactPages.length === 0) {
    console.error('Contact page not found!')
    process.exit(1)
  }

  const contactPage = contactPages[0]
  const pageId = contactPage.id

  // Find media for the background image (we'll look for 000.jpg)
  const { docs: mediaDocs } = await payload.find({
    collection: 'media',
    where: {
      filename: { equals: '000.jpg' },
    },
    limit: 1,
  })

  const mediaId = mediaDocs[0]?.id || '6a35f29ff84d0116c5d5a2be'
  console.log(`Using media ID for background image: ${mediaId}`)

  // Construct the English Hero block content
  const heroBlockEn = {
    blockType: 'hero',
    backgroundImage: mediaId,
    content: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'paragraph',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            textFormat: 0,
            textStyle: "",
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Let’s start a conversation.',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: ''
              }
            ]
          },
          {
            type: 'paragraph',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            textFormat: 0,
            textStyle: "",
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Tell us about your project, your challenges, and where you want to go. We’ll handle the strategy, design, and technology to get you there.',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: ''
              }
            ]
          }
        ]
      }
    }
  }

  // Construct the French Hero block content
  const heroBlockFr = {
    blockType: 'hero',
    backgroundImage: mediaId,
    content: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'paragraph',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            textFormat: 0,
            textStyle: "",
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Commençons la discussion.',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: ''
              }
            ]
          },
          {
            type: 'paragraph',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            textFormat: 0,
            textStyle: "",
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Parlez-nous de votre projet, de vos défis et de vos ambitions. Nous nous occupons de la stratégie, du design et de la technologie pour y parvenir.',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: ''
              }
            ]
          }
        ]
      }
    }
  }

  // Get EN layout and prepend Hero block if not already present
  const pageEn = await payload.findByID({
    collection: 'pages',
    id: pageId,
    locale: 'en',
    depth: 0,
  })

  let layoutEn = pageEn.layout || []
  const hasHeroEn = layoutEn.some((block: any) => block.blockType === 'hero')
  if (!hasHeroEn) {
    layoutEn = [heroBlockEn, ...layoutEn]
    await payload.update({
      collection: 'pages',
      id: pageId,
      locale: 'en',
      data: {
        layout: layoutEn,
      },
    })
    console.log('Successfully added Hero block to English Contact page.')
  } else {
    console.log('English Contact page already has a Hero block.')
  }

  // Get FR layout and prepend Hero block if not already present
  const pageFr = await payload.findByID({
    collection: 'pages',
    id: pageId,
    locale: 'fr',
    depth: 0,
  })

  let layoutFr = pageFr.layout || []
  const hasHeroFr = layoutFr.some((block: any) => block.blockType === 'hero')
  if (!hasHeroFr) {
    layoutFr = [heroBlockFr, ...layoutFr]
    await payload.update({
      collection: 'pages',
      id: pageId,
      locale: 'fr',
      data: {
        layout: layoutFr,
      },
    })
    console.log('Successfully added Hero block to French Contact page.')
  } else {
    console.log('French Contact page already has a Hero block.')
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
