import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email and password are automatically added by auth: true
    {
      name: 'name',
      type: 'text',
    },
  ],
}
