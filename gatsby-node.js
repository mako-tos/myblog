const path = require('path');
const fetch = require('node-fetch');
const config = require('./config/site');

const query = `
query {
  allMicrocmsBlog(sort: { fields: [createdAt], order: DESC }) {
    edges {
      node {
        blogId
        createdAt(formatString: "YYYY-MM-DD")
        tags {
          slug
          title
        }
        childMicrocmsImage {
          childFile {
            childImageSharp {
              fluid {
                base64
                tracedSVG
                srcWebp
                srcSetWebp
                originalImg
                originalName
              }
            }
          }
        }
        slug
        title
      }
    }
  }
  allMicrocmsTag {
    edges {
      node {
        slug
        title
      }
    }
  }
}
`

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/post.jsx');
  const tagPage = path.resolve('src/templates/tags.jsx');
  const tagPosts = path.resolve('src/templates/tag.jsx');

  const result = await graphql(query);
  if (result.errors) {
    throw new Error(result.errors);
  }

  const posts = result.data.allMicrocmsBlog.edges;
  const tags = result.data.allMicrocmsTag.edges.map(tag => tag.node);

  createPage({
    path: '/tags',
    component: tagPage,
    context: {
      tags: tags,
    },
  });

  //create tags
  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag.slug}`,
      component: tagPosts,
      context: {
        slug: tag.slug,
        title: tag.title,
      },
    });
  });

  //create posts
  posts.forEach(({ node }, index) => {
    const path = `${node.createdAt}-${node.slug}`;
    const prev = index === 0 ? null : posts[index - 1].node;
    const next =
      index === posts.length - 1 ? null : posts[index + 1].node;
    createPage({
      path,
      component: postTemplate,
      context: {
        blogId: node.blogId,
        prev,
        next,
        allPosts: posts.map(post => post.node),
      },
    });
  });
};

/* Allows named imports */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

if (config.github) {
  /**
   * Load Github repository data
   */
  exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions
    // Data can come from anywhere, but for now create it manually
    const res = await fetch(`https://api.github.com/users/${config.github}/repos`)
    const json = await res.json()
    json.forEach(repo => {
      const nodeContent = JSON.stringify(repo)
      const nodeMeta = {
        id: createNodeId(`github-repos-${repo.name}`),
        parent: null,
        children: [],
        internal: {
          type: `GithubRepos`,
          mediaType: `text/html`,
          content: nodeContent,
          contentDigest: createContentDigest(repo),
        },
      }
      const node = Object.assign({}, repo, nodeMeta)
      createNode(node)
    })
  }
}
