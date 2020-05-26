import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Img } from '../components';

const Wrapper = styled.header`
  -webkit-clip-path: polygon(100% 0, 0 0, 0 70%, 50% 100%, 100% 70%);
  clip-path: polygon(100% 0, 0 0, 0 70%, 50% 100%, 100% 70%);
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    -webkit-clip-path: polygon(100% 0, 0 0, 0 90%, 50% 100%, 100% 90%);
    clip-path: polygon(100% 0, 0 0, 0 90%, 50% 100%, 100% 90%);
  }
  background: ${props => props.theme.gradient.rightToLeft};
  height: 300px;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    height: 300px;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    height: 275px;
  }
  position: relative;
  overflow: hidden;
  img {
    min-height: 100%;
    min-width: 100vw;
  }
`;

const Text = styled.div`
  color: ${props => props.theme.colors.white.base};
  z-index: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: ${props => props.theme.layout.base};
  padding: 0 2rem;
  margin-bottom: 3rem;
  align-items: center;
`;

const Subtitle = styled.p`
  max-width: 650px;
  color: ${props => props.theme.colors.white.light};
`;

const CreateTime = styled.time`
  &::before {
    content: '作成日：';
  }
`
const UpdateTime = styled.time`
  &::before {
    content: '更新日：';
  }
`

const rects = [
  {width: 240, height: 400},
  {width: 480, height: 400},
  {width: 960, height: 400},
  {width: 1440, height: 400},
  {width: 1920, height: 400},
]
const Header = ({ children, title, createdAt, updatedAt, cover }) => (
  <Wrapper itemScope="itemscope" itemType="http://schema.org/WPHeader">
    {cover && <Img url={cover} rects={rects} sizes="100vw" alt={title} />}
    <Text>
      <h1 itemProp="headline">{title}</h1>
      <div>
        {createdAt &&
          <CreateTime itemProp="datePublished">{createdAt}</CreateTime>
        }
        <br />
        {updatedAt &&
          <UpdateTime itemProp="dateModified">{updatedAt}</UpdateTime>
        }
      </div>
      {children && <Subtitle>{children}</Subtitle>}
    </Text>
  </Wrapper>
);

export default Header;

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  cover: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  craetedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  updatedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]),
};

Header.defaultProps = {
  children: false,
  cover: false,
  craetedAt: false,
  updatedAt: false,
  title: false,
  isUpdated: false,
};
