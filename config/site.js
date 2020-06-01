module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Step by Step', // Navigation and Site Title
  titleAlt: 'Step by Step for GatsbyJs', // Title for JSONLD
  description: 'my blog for studying GatsbyJS',
  url: 'https://myblog-by-mako-tos.netlify.app', // Domain of your site. No trailing slash!
  siteUrl: 'https://myblog-by-mako-tos.netlify.app', // url + pathPrefix
  siteLanguage: 'ja', // Language Tag on <html> element
  logo: '/logo/logo.png', // Used for SEO
  banner: 'static/logo/banner.png',
  // JSONLD / Manifest
  favicon: 'static/logo/favicon.png', // Used for manifest favicon generation
  shortName: 'SbS', // shortname for manifest. MUST be shorter than 12 characters
  author: 'mako-tos', // Author for schemaORGJSONLD
  themeColor: '#3e7bf2',
  backgroundColor: '#d3e0ff',
  twitter: 'z_macn', // Twitter Username
  github: 'mako-tos',
  postsPerPage: 6,
};
