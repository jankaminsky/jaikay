import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'emailLabel',
      type: 'text',
      defaultValue: 'Email',
      required: true,
      localized: true,
    },
    {
      name: 'emailAddress',
      type: 'text',
      defaultValue: 'jk@jaikay.com',
      required: true,
      localized: true,
    },
    {
      name: 'copyrightNotice',
      type: 'text',
      defaultValue: '© JAIKAY Digital Creative Studio, 2025',
      required: true,
      localized: true,
    },
  ],
}
