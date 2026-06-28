import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
