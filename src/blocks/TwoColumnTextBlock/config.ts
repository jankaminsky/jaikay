import type { Block } from 'payload'

export const TwoColumnTextBlock: Block = {
  slug: 'twoColumnText',
  fields: [
    {
      name: 'leftContent',
      type: 'richText',
      required: true,
    },
    {
      name: 'rightContentBlocks',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}
