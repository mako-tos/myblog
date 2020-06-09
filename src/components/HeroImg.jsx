import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const WrapperPicture = styled.picture`
  overflow: none;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-width: none;
    width: auto;
    height: 100%;
  }
`;

const HeroImg = ({src, title}) => {
  const url = src
  const sizes = "100vw";
  const quality = 80;
  const height = 400;
  const rects = [250, 500, 1000, 1500, 2000];
  const srcSetWebpArray = rects.map(width => {
    return `${url}?fit=crop&w=${width}&h=${height}&q=${quality}&fm=webp ${width}w`
  })
  const srcSetWebp = srcSetWebpArray.join(',')
  const srcSetOriginArray = rects.map(width => {
    return `${url}?fit=crop&w=${width}&h=${height}&q=${quality} ${width}w`
  })
  const srcSetOrigin = srcSetOriginArray.join(',')
  return (
    <>
      {url &&
        <WrapperPicture>
          <source type="image/webp" srcSet={srcSetWebp}
            sizes={sizes}
          />
          <source srcSet={srcSetOrigin}
            sizes={sizes}
          />
          <img
            srcSet={srcSetOrigin}
            src={`${url}?fit=crop&w=2000&h=400&q=${quality}`}
            alt={title}
            loading="lazy"
            sizes={sizes}
          />
        </WrapperPicture>
      }
    </>
  )
}
export default HeroImg
HeroImg.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  alt: PropTypes.string,
};
HeroImg.defaultProps = {
  src: false,
  alt: ''
}