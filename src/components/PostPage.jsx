import React from 'react';
import { Link } from 'gatsby';
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

const SideBar = styled.div`
  width: 20%;
  flex: 1;
  padding-top: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 90%;
    margin: auto;
    padding: 0 1.5rem 1.5rem 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.s}) {
    width: 95%;
  }
`
const RelatedPostList = styled.ol`
  list-style: none;
  li {
    a {
      text-dacoration: none;
    }
  }
`
const Holly = styled.div`
  @media (min-width: ${props => props.theme.breakpoints.m}) {
    display: flex;
  }
`

const Post = ({ data, pageContext, location, relatedPosts }) => {
  const { next, prev } = pageContext;
  const { headImage, title, tags, createdAt, updatedAt, body, digest } = data;
  const regex = /(<([^>]+)>)/ig
  const planText = body.replace(regex, '')
  const excerpt = (digest || planText).substr(0, 120)

  const date = updatedAt || createdAt
  const isUpdated = updatedAt !== createdAt

  const preRegex = /(<pre><code>)/ig
  const newBody = body.replace(preRegex, '<pre class="language-jsx"><code class="language-jsx">')

  return (
    <Layout>
      <SEO
        title={title}
        description={excerpt || ' '}
        banner={headImage && headImage.url}
        pathname={location.pathname}
        article
      />
      <Header title={title} date={date} cover={headImage && headImage.url} isUpdated={ isUpdated } />
      <Holly>
        <SideBar />
        <Container>
          <Content input={newBody} />
          <TagsBlock list={tags || []} />
        </Container>
        <SideBar>
          関連記事
          <RelatedPostList>
            {relatedPosts.map((post, index) => (
              <li key={index}>
                <Link to={`${post.createdAt}-${post.slug}`}>
                  {post.title}
                </Link>
              </li>
            ))}
          </RelatedPostList>
        </SideBar>
      </Holly>
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
    body: PropTypes.string.isRequired,
    digest: PropTypes.string,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    headImage: PropTypes.object,
    tags: PropTypes.array,
  }),
  location: PropTypes.object.isRequired,
  relatedPosts: PropTypes.array.isRequired,
};
