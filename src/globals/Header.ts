import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      localized: true,
    },
    {
      name: 'navItems',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Page Reference', value: 'reference' },
            { label: 'Custom URL', value: 'custom' },
          ],
          defaultValue: 'reference',
          required: true,
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
          validate: (value: any, { siblingData }: any) => {
            if (siblingData?.type === 'reference' && !value) {
              return 'This field is required'
            }
            return true
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
          validate: (value: any, { siblingData }: any) => {
            if (siblingData?.type === 'custom' && !value) {
              return 'This field is required'
            }
            return true
          },
        },
      ],
    },
  ],
}
