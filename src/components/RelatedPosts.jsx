import { Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { createPath } from '../functions';
import Img from 'gatsby-image';
import theme from '../../config/theme';

const RelatedPostList = styled.ol`
  list-style: none;
`;

const Wrapper = styled.li`
  padding-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 2rem;
  position: relative;
  height: 12rem;
  z-index: 100;
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
    transform: scale(1.04);
  }

  @media (max-width: 1000px) {
    max-width: calc(99.9% - 1rem);
    width: calc(99.9% - 1rem);
    height: 12rem;
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-right: 1rem;
  z-index: 3;
  border-radius: ${props => props.theme.borderRadius.default};
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: -10;
    border-radius: ${theme.borderRadius.default};
    transition: opacity ${theme.transitions.default.duration};
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  overflow: hidden;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  border-radius: ${props => props.theme.borderRadius.default};
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }
  > div {
    position: static !important;
  }
  > div > div {
    position: static !important;
  }
`;

const Info = styled.div`
  color: ${props => props.theme.colors.white.light};
  margin: 0 1rem 1.25rem 1.25rem;
  position: absolute;
  bottom: 1rem;
  left: 0;
`;

const Title = styled.h2`
  margin-bottom: 0.6rem;
`;

const RelatedPosts = ({ posts }) => (
  <section>
    関連記事
    <RelatedPostList>
      {posts.map((post, index) => {
        const sizedFluid = {
          ...post.childMicrocmsImage.childFile.childImageSharp.fluid,
          sizes: '(max-width: 1000px) 90vw, 350px',
        };

        return (
          <Wrapper key={index}>
            <Image>
              <Img
                alt={post.title}
                fluid={sizedFluid}
                durationFadeIn={100}
              />
            </Image>
            <StyledLink to={createPath(post)}>
              <Info>
                <Title>{post.title}</Title>
              </Info>
            </StyledLink>
          </Wrapper>
        );
      })}
    </RelatedPostList>
  </section>
);

export default RelatedPosts;

RelatedPosts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      childMicrocmsImage: PropTypes.object.isRequired,
    })
  ),
};
