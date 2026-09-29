import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'category', 'updatedAt'],
  },
  access: {
    read: () => true, // Public API access
  },
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
      admin: {
        description: 'Project code e.g. 01, 02',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      defaultValue: 'AI SYSTEMS',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'text',
      admin: {
        description: 'Cover image URL or path',
      },
    },
    {
      name: 'problem',
      type: 'textarea',
      required: true,
    },
    {
      name: 'solution',
      type: 'textarea',
      required: true,
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'sublabel',
          type: 'text',
        },
      ],
    },
    {
      name: 'techStack',
      type: 'array',
      fields: [
        {
          name: 'category',
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
    {
      name: 'architecture',
      type: 'group',
      fields: [
        {
          name: 'overview',
          type: 'textarea',
        },
        {
          name: 'flowSteps',
          type: 'array',
          fields: [
            {
              name: 'step',
              type: 'text',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'desc',
              type: 'textarea',
            },
            {
              name: 'latency',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'githubUrl',
      type: 'text',
    },
    {
      name: 'liveUrl',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order priority',
      },
    },
  ],
}
