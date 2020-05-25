const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/post.jsx');
    const tagPage = path.resolve('src/templates/tags.jsx');
    const tagPosts = path.resolve('src/templates/tag.jsx');

    resolve(
      graphql(
        `
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
      ).then(result => {
        if (result.errors) {
          return reject(result.errors);
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
              allPosts: posts.map(post => post.node)
            },
          });
        });
      })
    );
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
