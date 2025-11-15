import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Anomaly Modding Book',
  tagline: 'Introductory book for S.T.A.L.K.E.R. Anomaly modding',
  favicon: 'img/favicon.ico',
  markdown: {
    mermaid: true,
  },

  url: 'https://anomaly-modding-book.netlify.app',
  baseUrl: '/',
  trailingSlash: false,

  future: {
    v4: true,
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
    },
  },

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onDuplicateRoutes: 'warn',
  onBrokenAnchors: 'warn',

  plugins: [
    'docusaurus-plugin-image-zoom',
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: 'img/favicon.ico' },
          { tagName: 'link', rel: 'manifest', href: 'manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#7bd21a' },
          { tagName: 'meta', name: 'mobile-web-app-capable', content: 'yes' },
          {
            tagName: 'meta',
            name: 'mobile-web-app-status-bar-style',
            content: 'black-translucent',
          },
        ],
      },
    ],
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

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        searchResultLimits: 20,
        searchResultContextMaxLength: 100,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarPosition: 'right',
        indexPages: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async params => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter(item => !item.url.includes('/page/'));
          },
        },
        debug: undefined,

        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/TheParaziT/anomaly-modding-book/blob/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          remarkPlugins: [],
          rehypePlugins: [],
        },

        blog: {
          blogTitle: 'Anomaly Modding Blog',
          blogDescription: 'Latest news about S.T.A.L.K.E.R. Anomaly modding',
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 10,
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            copyright: `Copyright © ${new Date().getFullYear()} Anomaly Modding Book.`,
          },
          editUrl: 'https://github.com/TheParaziT/anomaly-modding-book/blob/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
          postsPerPage: 10,
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content:
          'stalker, anomaly, modding, guide, tutorial, xray-engine, s.t.a.l.k.e.r, game development, modding tools, blender, sdk, scripting, lua, xray engine, monolith',
      },
      {
        name: 'description',
        content: 'Introductory book for S.T.A.L.K.E.R. Anomaly modding.',
      },
      { name: 'google-site-verification', content: 'rCCq8pjOM03lh4gKsuTn5ybHKjZF2CX4NZacbsv72qE' },
      { name: 'author', content: 'Anomaly Modding Book Community' },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#7bd21a' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Anomaly Modding Book' },
      {
        property: 'og:description',
        content: 'Introductory book for S.T.A.L.K.E.R. Anomaly modding',
      },
      { property: 'og:site_name', content: 'Anomaly Modding Book' },
      { property: 'og:locale', content: 'en_US' },
      // Optional analytics meta for CSP/nonce-based injectors
      process.env.GTAG_ID
        ? { name: 'google-analytics-id', content: process.env.GTAG_ID }
        : undefined,
    ].filter(Boolean) as any,
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgba(240, 240, 240, 0.9)',
        dark: 'rgba(50, 50, 50, 0.9)',
      },
      config: {},
    },

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    announcementBar: {
      id: 'notice',
      content:
        'Please keep in mind that the book is still being written, and the information provided here may not be accurate, or may not be provided at all!',
      isCloseable: true,
    },

    navbar: {
      title: 'Anomaly Modding Book',
      logo: {
        alt: 'Anomaly Modding Book Logo',
        src: 'img/logo-dark.svg',
        width: 32,
        height: 32,
        href: '/',
        target: '_self',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'gettingstartedSidebar',
          position: 'left',
          label: 'Getting Started',
          className: 'navbar-item-with-icon navbar-getting-started-item',
        },
        {
          to: '/glossary',
          label: 'Glossary',
          position: 'left',
          className: 'navbar-item-with-icon navbar-glossary-item',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorials',
          className: 'navbar-item-with-icon navbar-tutorial-item',
        },
        {
          type: 'docSidebar',
          sidebarId: 'referencesSidebar',
          position: 'left',
          label: 'References',
          className: 'navbar-item-with-icon navbar-reference-item',
        },
        {
          type: 'docSidebar',
          sidebarId: 'moddingtoolsSidebar',
          position: 'left',
          label: 'Modding Tools',
          className: 'navbar-item-with-icon navbar-moddingtool-item',
        },
        {
          type: 'docSidebar',
          sidebarId: 'resourcesSidebar',
          position: 'left',
          label: 'Resources',
          className: 'navbar-item-with-icon navbar-resource-item',
        },
        {
          type: 'docSidebar',
          sidebarId: 'engineapiSidebar',
          position: 'left',
          label: 'Engine API',
          className: 'navbar-item-with-icon navbar-engine-api-item',
        },
        {
          type: 'docSidebar',
          sidebarId: 'scriptingapiSidebar',
          position: 'left',
          label: 'Scripting API',
          className: 'navbar-item-with-icon navbar-scripting-api-item',
        },
        {
          type: 'docSidebar',
          sidebarId: 'forcontributorsSidebar',
          position: 'left',
          label: 'For Contributors',
          className: 'navbar-item-with-icon navbar-for-contributors-item',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
      ],
    },

    footer: {
      style: 'dark',
      logo: {
        alt: 'Anomaly Modding Book',
        src: 'img/logo-light.svg',
        href: '/',
        width: 50,
        height: 50,
      },
      links: [
        {
          title: 'Learn',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started' },
            { label: 'Glossary', to: '/glossary' },
            { label: 'Tutorials', to: '/docs/tutorials' },
            { label: 'References', to: '/docs/references' },
            { label: 'Resources', to: '/docs/resources' },
            { label: 'Modding Tools', to: '/docs/modding-tools' },
            { label: 'Engine API', to: '/docs/engine-api' },
            { label: 'Scripting API', to: '/docs/scripting-api' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: 'https://discord.gg/8Pu2ekQYg3' },
            { label: 'GitHub', href: 'https://github.com/TheParaziT/anomaly-modding-book' },
            { label: 'For Contributors', to: '/docs/for-contributors' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            {
              label: 'Netlify Status',
              href: 'https://status.netlify.com',
            },
            {
              to: '/acknowledgment',
              label: 'Acknowledgment',
              position: 'right',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Anomaly Modding Book. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      defaultLanguage: 'lua',
      additionalLanguages: ['lua', 'ini', 'bash', 'json', 'cpp', 'bnf'],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
      ],
    },

    docs: {
      sidebar: {
        hideable: false, // false until i fix width hidden-sidebar
        autoCollapseCategories: true,
      },
    },

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
