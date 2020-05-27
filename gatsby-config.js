require('dotenv').config()
const proxy = require("http-proxy-middleware")
const config = require('./config/site');
const { createPath, excerpt } = require('./src/functions')

module.exports = {
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  },
  siteMetadata: {
    ...config,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              quality: 80,
              linkImagesToOriginal: true,
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        autoLabel: process.env.NODE_ENV !== 'production',
        // eslint-disable-next-line
        labelFormat: `[filename]--[local]`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
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
        endpoint: 'blog'
      },
    },
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICRO_CMS_API_KEY,
        serviceId: process.env.MICRO_CMS_SERVICE_ID,
        endpoint: 'tag'
      },
    },
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: config.siteUrl // required!
      }
    },
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: false,
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'report.html'
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
              return allMicrocmsBlog.edges.map(edge => {
                const url = `${site.siteMetadata.siteUrl}/${createPath(edge.node)}`
                return Object.assign({}, edge.node, {
                  description: excerpt(edge.node.body, 120),
                  date: edge.node.createdAt,
                  url: url,
                  guid: url,
                  custom_elements: [{ "content:encoded": edge.node.body }],
                })
              })
            },
            query: `
              {
                allMicrocmsBlog(sort: { fields: [createdAt], order: DESC }) {
                  edges {
                    node {
                      slug
                      title
                      createdAt(formatString: "YYYY-MM-DD")
                      body
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: `${config.title}'s RSS Feed`,
            match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        exclude: ["/draft/**"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 100,
        // Defers execution of google analytics script after page load
        defer: true,
      },
    },
  ],
};
