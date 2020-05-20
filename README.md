<p align="center">
  このブログは
  <a href="https://github.com/justinformentin/gatsby-v2-tutorial-starter">
    gatsby-v2-tutorial-starter
  </a>
  を改変して作成してます
  <br />
  一番大きな違いは
  <a href="https://microcms.io/">
    microCMS
  </a>
  を導入している点です。
</p>

<p align="center">
  <strong>
    View the demo at <a href="https://myblog-by-mako-tos.netlify.app/">myblog-by-mako-tos.netlify.app/</a>.
  </strong>
</p>

## Features

- Gatsby v2
- Emotion for styling
- Code syntax highlighting
- Tags
- SEO
  - Sitemap generation
  - Schema.org JSON-LD for Google Rich Snippets
  - Twitter Tags
  - OpenGraph Tags for Facebook/Google+/Pinterest
  - robots.txt
- Typography.js
- Typefaces for faster font loading
- Offline Support
- Manifest Support
- Development tools
  - ESLint for linting
  - Prettier for code style
  - CircleCI support

# Usage

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mako-tos/myblog)

```bash
Download project
# With `gatsby-cli`
gatsby new my-site https://github.com/mako-tos/myblog

OR

# Cloning
git clone my-site https://github.com/mako-tos/myblog.git
cd my-site

THEN

# Install dependencies
npm i

# Start dev server
gatsby develop

# Build for production
gatsby build

# Format with Prettier
npm format

```

## Folder structure
```bash
├──.circleci # Circleci integration
├── config # Theme and site metadata
├── content # Post markdown and images
├── src
│   ├── components
│   ├── layouts
│   ├── pages
│   ├── style
│   └── templates # For Post and Tag page generation
├── static # Images for logo and favicon, and robots.txt
├── gatsby-config.js # Plugin loading and configuration
└── gatsby-node.js # Generate posts/tags and modify webpack
```
