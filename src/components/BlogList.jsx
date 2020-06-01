import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { TagsBlock } from 'components';
import Img from 'gatsby-image';

const Container = styled.article`
  text-align: ${props => (props.center ? 'center' : '')};
  margin: auto;
  padding: 3rem 1.5rem 1.5rem 1.5rem;
  width: 60%;
  max-width: ${props => props.theme.layout[props.type]};
  height: 100%;
  flex: 3;

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 90%;
  }

  @media (max-width: ${props => props.theme.breakpoints.s}) {
    width: 95%;
  }
`;

const Wrapper = styled.div`
  margin: 0 3rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    margin: 1rem;
  }
`;

const Image = styled.div`
  margin: auto;
  position: relative;
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  transition: ${props => props.theme.transitions.boom.transition};
  border-radius: ${props => props.theme.borderRadius.default};
  min-height: 300px;
  overflow: hidden;
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }

  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
    transform: scale(1.04);
  }
  a {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: ${props => props.theme.borderRadius.default};
    > div {
      position: static !important;
    }
    > div > div {
      position: static !important;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 5px ${props => props.theme.colors.primary.dark};
    }
  }
  flex-basis: 100%;
  max-width: 100%;
  width: 100%;
  @media (max-width: 800px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 500px) {
    min-height: 200px;
  }
`;

const Information = styled.div`
  h1 {
    font-size: 2rem;
    display: inline-block;
    color: ${props => props.theme.colors.black.base};
    transition: all ${props => props.theme.transitions.default.duration};
    &:hover {
      color: ${props => props.theme.colors.primary.base};
    }
  }
  text-align: center;
  flex-basis: 100%;
  max-width: 100%;
  width: 100%;
  @media (max-width: 800px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
  }
`;

const DateWrapper = styled.div`
  margin-top: 1rem;
  color: ${props => props.theme.colors.black.lighter};
`;

const CreateTime = styled.time`
  &::before {
    content: '作成日：';
  }
`;
const UpdateTime = styled.time`
  margin-left: 1rem;
  &::before {
    content: '更新日：';
  }
`;

const Title = styled.h1`
  margin: 0;
`;

const BlogList = ({
  path,
  fluid,
  title,
  createdAt,
  updatedAt,
  excerpt,
  tags,
}) => {
  const sizedFluid = { ...fluid, sizes: '(max-width: 900) 80vw, 800px' };
  return (
    <Container>
      <Wrapper>
        <Image>
          <Link to={path} title={title}>
            <Img
              alt={title}
              fluid={sizedFluid}
              loading={'lazy'}
              fadeIn={false}
            />
          </Link>
        </Image>
        <Information>
          <DateWrapper>
            {createdAt && (
              <CreateTime itemProp="datePublished">{createdAt}</CreateTime>
            )}
            {createdAt !== updatedAt && (
              <UpdateTime itemProp="dateModified">{updatedAt}</UpdateTime>
            )}
          </DateWrapper>
          <Link to={path}>
            <Title itemProp="name headline">{title}</Title>
          </Link>
          <TagsBlock list={tags} />
          <div itemProp="description">{excerpt}</div>
        </Information>
      </Wrapper>
    </Container>
  );
};

export default BlogList;

BlogList.propTypes = {
  fluid: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};
