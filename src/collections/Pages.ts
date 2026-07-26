import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock/config'
import { ServicesBlock } from '../blocks/ServicesBlock/config'
import { TwoColumnTextBlock } from '../blocks/TwoColumnTextBlock/config'
import { ContactFormBlock } from '../blocks/ContactForm'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      localized: true,
      blocks: [
        HeroBlock,
        ServicesBlock,
        TwoColumnTextBlock,
        ContactFormBlock,
      ],
    },
  ],
}
