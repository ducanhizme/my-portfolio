import type { CollectionConfig } from 'payload'

export const Stack: CollectionConfig = {
  slug: 'stack',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Category name (e.g. AI & AGENT SYSTEMS)',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'level',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 90,
        },
        {
          name: 'usedFor',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
            },
          ],
        },
        {
          name: 'highlight',
          type: 'text',
        },
      ],
    },
    {
      name: 'architectureNote',
      type: 'textarea',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
