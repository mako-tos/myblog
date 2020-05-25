import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Header, BlogList } from 'components';
import { Layout } from 'layouts';
import { createPath, excerpt } from '../functions'

const Blog = ({ data }) => {
  const { edges } = data.allMicrocmsBlog;
  return (
    <Layout>
      <Helmet title={'Blog Page'} />
      <Header title="Blog Page">Stey by Step</Header>
      {edges.map(({ node }) => {
        const { headImage, title, tags, createdAt, updatedAt, body, digest } = node;
        const description = excerpt(digest || body, 80)

        const path = createPath(node)

        return (
          <BlogList
            key={path}
            cover={headImage.url}
            path={path}
            title={title}
            date={updatedAt || createdAt}
            tags={tags}
            excerpt={`${description}...`}
          />
        );
      })}

    </Layout>
  );
};

export default Blog;

Blog.propTypes = {
  data: PropTypes.shape({
    allMicrocmsBlog: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            headImage: PropTypes.object.isRequired,
            slug: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
            tags: PropTypes.array,
            body: PropTypes.string.isRequired,
            digest: PropTypes.string,
          }),
        }).isRequired
      ),
    }),
  }),
};

export const query = graphql`
  query {
    allMicrocmsBlog(
      sort: { fields: [createdAt], order: DESC }
      limit: 6
    ) {
      edges {
        node {
          slug
          title
          createdAt(formatString: "YYYY-MM-DD")
          updatedAt(formatString: "YYYY-MM-DD")
          tags {
            slug
            title
          }
          headImage {
            url
          }
          digest
          body
        }
      }
    }
  }
`;
