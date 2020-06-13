require('dotenv').config();
const proxy = require('http-proxy-middleware');
const config = require('./config/site');
const { createPath } = require('./src/functions');

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    );
  },
  siteMetadata: {
    ...config,
  },
  plugins: [
    'gatsby-plugin-preact',
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        sourceMap: false,
        autoLabel: process.env.NODE_ENV !== 'production',
        // eslint-disable-next-line
        labelFormat: `[filename]--[local]`,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: [
          '/mail-invite/',
          '/mail-confirm/',
          '/welcome/',
          '/draft/',
          '/404/',
        ],
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          site {
            siteMetadata {
              siteUrl
            }
          }
        }`,
        serialize: ({ site, allSitePage }) => {
          return allSitePage.nodes.map(node => {
            return {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: `daily`,
              priority: 0.7,
            };
          });
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.shortName,
        description: config.description,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon,
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICRO_CMS_API_KEY,
        serviceId: process.env.MICRO_CMS_SERVICE_ID,
        endpoint: 'blog',
        readAll: true,
        query: {
          limit: 100,
        },
      },
    },
    {
      resolve: '@mako-tos/gatsby-images-microcms',
      options: {
        mediaType: 'MicrocmsBlog', // string
        field: 'headImage', // string
      },
    },
    {
      resolve: '@mako-tos/gatsby-transformer-for-microcms',
      options: {
        mediaType: 'MicrocmsBlog', // string
        field: 'body', // string
        useHljs: true,
      },
    },
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICRO_CMS_API_KEY,
        serviceId: process.env.MICRO_CMS_SERVICE_ID,
        endpoint: 'tag',
      },
    },
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: config.siteUrl, // required!
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        devMode: false,
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'report.html',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMicrocmsBlog } }) => {
              return allMicrocmsBlog.edges.map(({ node }) => {
                const url = `${site.siteMetadata.siteUrl}${createPath(node)}`;

                return Object.assign({}, node, {
                  description: (
                    node.digest || node.childConvertHtml.plainText
                  ).substr(0, 120),
                  date: node.createdAt,
                  url: url,
                  guid: url,
                  custom_elements: [
                    { 'content:encoded': node.childConvertHtml.plainText },
                  ],
                });
              });
            },
            query: `
              {
                allMicrocmsBlog(sort: { fields: [createdAt], order: DESC }) {
                  edges {
                    node {
                      slug
                      title
                      createdAt(formatString: "YYYY-MM-DD")
                      digest
                      childConvertHtml {
                        plainText
                      }            
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: `${config.title}'s RSS Feed`,
            match: '^/blog/',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOGLE_TAG_MANAGER,
        includeInDevelopment: true
      }
    },
    {
      resolve: 'gatsby-plugin-no-javascript',
      options: {
        excludePaths: 'draft|welcome|mail\-confirm|mail\-invite',
      }
    },
    {
      resolve: 'gatsby-plugin-no-javascript-utils',
      options: {
        noSourcemaps: true,
        removeGeneratorTag: true,
        removeReactHelmetAttrs: true,
        noInlineStyles: false,
        removeGatsbyAnnouncer: false,
        removeFocusWrapper: false,
        removePreloadLinks: false,
      },
    },
  ],
};
