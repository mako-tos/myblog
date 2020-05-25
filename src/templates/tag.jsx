import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Layout, Container } from 'layouts';
import { Header } from 'components';
import config from '../../config/site';
import { createPath } from '../functions';

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.white.light};
  padding: 5px 10px;
  border: solid 1px #fff;
  border-radius: 20px;
  &:hover {
    color: ${props => props.theme.colors.black.blue};
    background: ${props => props.theme.colors.white.light};
  }
`;

const Information = styled.div`
  text-align: center;
  h1 {
    font-size: 2rem;
    margin-bottom: 1.25rem;
  }
`;

const Tag = ({ data, pageContext }) => {
  const { title } = pageContext;
  const posts = data.allMicrocmsBlog.edges;
  return (
    <Layout>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <Header title={title}>
        <StyledLink to="/tags">All Tags</StyledLink>
      </Header>
      <Container>
        <Information>
          {posts.map((post, index) => (
            <Link key={index} to={createPath(post.node)}>
              <h3>{post.node.title}</h3>
            </Link>
          ))}
        </Information>
      </Container>
    </Layout>
  );
};

export default Tag;

Tag.propTypes = {
  pageContext: PropTypes.shape({
    posts: PropTypes.array,
    tagName: PropTypes.string,
  }),
};

export const query = graphql`
  query($slug: String!) {
    allMicrocmsBlog(
      filter: { tags: { elemMatch: { slug: { in: [$slug] } } } }
    ) {
      edges {
        node {
          slug
          title
          createdAt(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;
