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
                  slug
                }
              }
              group(field: tags___slug) {
                fieldValue
                edges {
                  node {
                    slug
                    title
                    createdAt(formatString: "YYYY-MM-DD")
                  }
                }
              }
            }
          }    
        `
      ).then(result => {
        if (result.errors) {
          return reject(result.errors);
        }

        const posts = result.data.allMicrocmsBlog.edges
        const tags = result.data.allMicrocmsBlog.group

        const tagSlugs = tags.map(tag => {
          return { slug: tag.fieldValue, title: tag.fieldValue }
        } );

        createPage({
          path: '/tags',
          component: tagPage,
          context: {
            tags: tagSlugs,
          },
        });

        //create tags
        tags.forEach(tag => {
          const posts = tag.edges;

          createPage({
            path: `/tags/${tag.fieldValue}`,
            component: tagPosts,
            context: {
              posts,
              slug: tag.fieldValue,
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
