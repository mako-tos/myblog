import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Layout, Container, Content } from 'layouts';
import { TagsBlock, Header, SEO } from 'components';
import '../styles/prism';

const SuggestionBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: ${props => props.theme.colors.white.light};
  box-shadow: ${props => props.theme.shadow.suggestion};
`;
const PostSuggestion = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 3rem 0 3rem;
`;

const Post = ({ data, pageContext }) => {
  const { next, prev } = pageContext;
  const { headImage, slug, title, tags, createdAt, updatedAt, body, digest } = data.microcmsBlog;
  const path = `${createdAt}-${slug}`
  const div = document.createElement('div')
  div.innerHTML = body
  const excerpt = (digest || div.innerText).substr(0, 40)

  const date = updatedAt || createdAt
  const isUpdated = updatedAt === createdAt

  return (
    <Layout>
      <SEO
        title={title}
        description={excerpt || ' '}
        banner={headImage.src}
        pathname={path}
        article
      />
      <Header title={title} date={date} cover={headImage.url} isUpdated={ isUpdated } />
      <Container>
        <Content input={body} />
        <TagsBlock list={tags || []} />
      </Container>
      <SuggestionBar>
        <PostSuggestion>
          {prev && (
            <Link to={`${prev.createdAt}-${prev.slug}`}>
              Previous
              <h3>{prev.title}</h3>
            </Link>
          )}
        </PostSuggestion>
        <PostSuggestion>
          {next && (
            <Link to={`${next.createdAt}-${next.slug}`}>
              Next
              <h3>{next.title}</h3>
            </Link>
          )}
        </PostSuggestion>
      </SuggestionBar>
    </Layout>
  );
};

export default Post;

Post.propTypes = {
  pageContext: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
  }).isRequired,
  data: PropTypes.shape({
    microcmsBlog: PropTypes.shape({
      body: PropTypes.string.isRequired,
      digest: PropTypes.string,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      headImage: PropTypes.object.isRequired,
      tags: PropTypes.array,
    }),
  }),
};

export const query = graphql`
  query($blogId: String!) {
    microcmsBlog(blogId: { eq: $blogId }) {
      body
      digest
      title
      slug
      createdAt(formatString: "YYYY-MM-DD")
      updatedAt(formatString: "YYYY-MM-DD")
      headImage {
        url
      }
      tags {
        slug
        title
      }
    }
  }
`;
