import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'Startups.org.ai',
  },
  links: [
    {
      text: 'Documentation',
      url: '/docs',
      active: 'nested-url',
    },
    {
      text: 'Packages',
      url: '/docs/packages',
    },
  ],
  githubUrl: 'https://github.com/dot-org-ai/startups.org.ai',
}
