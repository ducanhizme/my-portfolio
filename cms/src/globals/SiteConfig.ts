import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      defaultValue: 'DUC ANH',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'SOFTWARE ENGINEER · AI / AGENT SYSTEMS / WEB',
    },
    {
      name: 'statusText',
      type: 'text',
      defaultValue: 'Available for AI Systems Engineering',
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'ninhanh917@gmail.com',
    },
    {
      name: 'github',
      type: 'text',
      defaultValue: 'https://github.com',
    },
    {
      name: 'linkedin',
      type: 'text',
      defaultValue: 'https://linkedin.com',
    },
  ],
}
