import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

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

const Header = ({ children, title, date, cover, isUpdated }) => (
  <Wrapper>
    {cover && (
      <picture>
        <source type="image/webp" srcSet={`${cover}?w=250&q=80&fm=webp 250w,
          ${cover}?w=500&q=80&fm=webp 500w,
          ${cover}?w=1000&&q=80&fm=webp 1000w,
          ${cover}?w=1500&q=80&fm=webp 1500w`}
        />
        <source srcSet={`${cover}?w=250&q=80 250w,
          ${cover}?w=500&q=80 500w,
          ${cover}?w=1000&q=80 1000w,
          ${cover}?w=1500&q=80 1500w`}
        />
        <img
          srcSet={`${cover}?w=250&q=80 250w,
          ${cover}?w=500&q=80 500w,
          ${cover}?w=1000&q=80 1000w,
          ${cover}?w=1500&q=80 1500w`}
          src={`${cover}?w=1000&q=80`} alt="" loading="lazy"
        />
      </picture>
    )}
    <Text>
      <h1>{title}</h1>
      {date &&
        <h3>
          {isUpdated ?
            <span>更新日：</span> :
            <span>作成日：</span>
          }
          {date}
        </h3>
     }

      {children && <Subtitle>{children}</Subtitle>}
    </Text>
  </Wrapper>
);

export default Header;

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  cover: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isUpdated: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]),
};

Header.defaultProps = {
  children: false,
  cover: false,
  date: false,
  title: false,
  isUpdated: false
};
