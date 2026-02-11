import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  // Site metadata
  title: 'Everything Claude Code',
  tagline: 'Interactive documentation and tutorials for mastering Claude Code',
  favicon: 'img/favicon.svg',

  // URL configuration
  url: 'https://everything-claude-code.dev',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'affaan-m',
  projectName: 'everything-claude-code',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Internationalization
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },

  // SEO: Head tags applied to every page
  headTags: [
    // PWA manifest
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/manifest.json',
      },
    },
    // Apple touch icon
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/icons/icon-192x192.png',
      },
    },
    // Theme color for mobile browsers
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#3b82f6',
      },
    },
    // MS Application tile color
    {
      tagName: 'meta',
      attributes: {
        name: 'msapplication-TileColor',
        content: '#3b82f6',
      },
    },
  ],

  // Theme configuration with color mode
  themeConfig: {
    // SEO: Site image for social sharing
    image: 'img/social-card.png',
    
    // SEO: Metadata
    metadata: [
      { name: 'keywords', content: 'Claude Code, ECC, AI coding, TDD, agents, documentation' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'og:type', content: 'website' },
    ],

    // Algolia DocSearch configuration (placeholder)
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'everything-claude-code',
      contextualSearch: true,
      searchPagePath: 'search',
    },

    // Announcement bar for important updates
    announcementBar: {
      id: 'support_us',
      content: '🚀 ECC 学习站点已上线！<a href="/docs/tutorials/">开始交互式教程</a>',
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      isCloseable: true,
    },

    // Color mode configuration for dark/light theme toggle
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // ECC branding colors
    navbar: {
      title: 'ECC',
      logo: {
        alt: 'ECC Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          to: '/docs/tutorials/',
          label: '教程',
          position: 'left',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/affaan-m/everything-claude-code',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            {
              label: '快速开始',
              to: '/docs/quick-start',
            },
            {
              label: '交互式教程',
              to: '/docs/tutorials/',
            },
          ],
        },
        {
          title: '核心概念',
          items: [
            {
              label: '命令',
              to: '/docs/core-concepts/commands',
            },
            {
              label: 'Agents',
              to: '/docs/core-concepts/agents',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/affaan-m/everything-claude-code',
            },
            {
              label: 'Issues',
              href: 'https://github.com/affaan-m/everything-claude-code/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Everything Claude Code. Built with ❤️ and Claude.`,
    },

    // Syntax highlighting with Prism
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'markdown'],
    },

    // Table of contents configuration
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,

  // Presets configuration
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/affaan-m/everything-claude-code/tree/main/ecc-docs/',
          // Disabled: Vercel deployment doesn't include full git history
          // showLastUpdateTime: true,
          // showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/affaan-m/everything-claude-code/tree/main/ecc-docs/blog/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // SEO: Sitemap generation
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
        },
        // SEO: Google Tag Manager (placeholder)
        gtag: {
          trackingID: 'G-XXXXXXXXXX',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  // Plugins
  plugins: [
    // Ideal Image plugin for optimized images
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
  ],
}

export default config
