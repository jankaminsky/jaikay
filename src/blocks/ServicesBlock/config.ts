import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services',
  fields: [
    {
      name: 'servicesList',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
