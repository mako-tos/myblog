const path = require('path');
const fetch = require('node-fetch');
const config = require('./config/site');
const { createPath } = require('./src/functions/');
const { paginate } = require(`gatsby-awesome-pagination`);

const query = `
fragment FluidWithWebp on Fluid {
  aspectRatio
  src
  srcSet
  srcSetType
  srcWebp
  srcSetWebp
  sizes
}
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
        fluid(quality: 90) {
          ...FluidWithWebp
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
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/post.jsx');
  const tagPage = path.resolve('src/templates/tags.jsx');
  const tagPosts = path.resolve('src/templates/tag.jsx');
  const blogTemplate = path.resolve(`./src/templates/blog.jsx`);

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

  // Create a page containing all "posts" and paginate.
  const basePath = '/blog';
  paginate({
    createPage,
    component: blogTemplate,
    items: posts,
    itemsPerFirstPage: config.postsPerPage || 6,
    itemsPerPage: config.postsPerPage || 6,
    pathPrefix: basePath,
    context: {
      basePath: basePath,
      paginationPath: `${basePath}`,
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
    const path = createPath(node);
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;
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
