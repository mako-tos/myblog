import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Header, BlogList } from 'components';
import { Layout } from 'layouts';
import { createPath, excerpt } from '../functions';
import Pagination from '../components/Pagination'

const Blog = ({ data, pageContext }) => {
  const { edges } = data.allMicrocmsBlog;
  return (
    <Layout>
      <Helmet title={'Blog Page'} />
      <Header title="Blog Page">Stey by Step</Header>
      <Pagination context={pageContext} />
      {edges.map(({ node }) => {
        const {
          childMicrocmsImage,
          title,
          tags,
          createdAt,
          updatedAt,
          body,
          digest,
        } = node;
        const description = excerpt(digest || body, 80);

        const path = createPath(node);

        return (
          <BlogList
            key={path}
            fluid={childMicrocmsImage.childFile.childImageSharp.fluid}
            path={path}
            title={title}
            createdAt={createdAt}
            updatedAt={updatedAt}
            tags={tags}
            excerpt={`${description}...`}
          />
        );
      })}
      <Pagination context={pageContext} />
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
            childMicrocmsImage: PropTypes.object.isRequired,
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
  query($skip: Int!, $limit: Int!) {
    allMicrocmsBlog(
      sort: { fields: [createdAt], order: DESC }
      limit: $limit
      skip: $skip
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
          childMicrocmsImage {
            childFile {
              childImageSharp {
                fluid(quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          digest
          body
        }
      }
    }
  }
`;
