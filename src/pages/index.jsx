import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Header, PostList } from 'components';
import { Layout } from 'layouts';
import { SEO } from '../components';
import { createAmpPath } from '../functions';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4rem 4rem 1rem 4rem;
  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 1rem 1rem;
  }
`;

const Index = ({ data, location }) => {
  const { edges } = data.allMicrocmsBlog;
  return (
    <Layout>
      <SEO title={'Home Page'} pathname={location.pathname} />
      <Header title="Step by Step">Home Page</Header>
      <PostWrapper>
        {edges.map(({ node }) => {
          const {
            childMicrocmsImage,
            title,
            tags,
            createdAt,
            body,
            digest,
            childCheerioHtml,
          } = node;
          const description = (
            digest ||
            childCheerioHtml.plainText ||
            body
          ).substr(0, 30);

          const path = createAmpPath(node);

          return (
            <PostList
              key={path}
              fluid={childMicrocmsImage.childFile.childImageSharp.fluid}
              path={path}
              title={title}
              createdAt={createdAt}
              tags={tags}
              excerpt={`${description}...`}
            />
          );
        })}
      </PostWrapper>
    </Layout>
  );
};

export default Index;

Index.propTypes = {
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
  query {
    allMicrocmsBlog(sort: { fields: [createdAt], order: DESC }, limit: 6) {
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
                fluid(quality: 80, maxWidth: 700) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          digest
          body
          childCheerioHtml {
            html
            hljsHtml
            plainText
          }
        }
      }
    }
  }
`;
