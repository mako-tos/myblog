import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Layout, Container, Content } from 'layouts';
import { TagsBlock, Header, SEO, RelatedPosts } from 'components';
import { createPath, excerpt } from '../functions';
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

const SideBar = styled.aside`
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
`;
const Holly = styled.div`
  @media (min-width: ${props => props.theme.breakpoints.m}) {
    display: flex;
  }
`;

const Post = ({ data, pageContext, location, relatedPosts }) => {
  const { next, prev } = pageContext;
  const { childMicrocmsImage, title, tags, createdAt, updatedAt, body, digest } = data;
  const description = excerpt(digest || body, 120);
  const fluid = childMicrocmsImage.childFile.childImageSharp.fluid

  const preRegex = /(<pre><code>)/gi;
  const newBody = body.replace(
    preRegex,
    '<pre class="language-jsx"><code class="language-jsx">'
  );

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        banner={fluid}
        pathname={location.pathname}
        article
      />
      <Header
        title={title}
        updatedAt={updatedAt}
        createdAt={createdAt}
        fluid={fluid}
      />
      <Holly>
        <Container>
          <TagsBlock list={tags || []} />
          <Content input={newBody} />
          <TagsBlock list={tags || []} />
        </Container>
        <SideBar itemScope="itemscope" itemtype="http://schema.org/WPSideBar">
          <RelatedPosts posts={relatedPosts} />
        </SideBar>
      </Holly>
      <SuggestionBar>
        <PostSuggestion>
          {prev && (
            <Link to={createPath(prev)} itemProp="url" title={prev.title}>
              Previous
              <h3 itemProp="name headline">{prev.title}</h3>
            </Link>
          )}
        </PostSuggestion>
        <PostSuggestion>
          {next && (
            <Link to={createPath(next)} itemProp="url" title={next.title}>
              Next
              <h3 itemProp="name headline">{next.title}</h3>
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
    childMicrocmsImage: PropTypes.object.isRequired,
    tags: PropTypes.array,
  }),
  location: PropTypes.object.isRequired,
  relatedPosts: PropTypes.array.isRequired,
};
