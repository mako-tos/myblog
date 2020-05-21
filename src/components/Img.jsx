import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

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
  }
`;
const Img = ({ url, sizes, quality, rects }) => {
  if (!url) {
    return <></>;
  }

  const srcSetWebpArray = rects.map(size => {
    return `${url}?fit=crop&w=${size.width}&h=${size.height}&q=${quality}&fm=webp ${size.width}w`;
  });
  const srcSetWebp = srcSetWebpArray.join(',');
  const srcSetOriginArray = rects.map(size => {
    return `${url}?fit=crop&w=${size.width}&h=${size.height}&q=${quality} ${size.width}w`;
  });
  const srcSetOrigin = srcSetOriginArray.join(',');
  return (
    <LazyLoad once offset={100}>
      <WrapperPicture>
        <source type="image/webp" srcSet={srcSetWebp} sizes={sizes} />
        <source srcSet={srcSetOrigin} sizes={sizes} />
        <img src={url} alt="" loading="lazy" sizes={sizes} />
      </WrapperPicture>
    </LazyLoad>
  );
};

export default Img;

Img.propTypes = {
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  rects: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    })
  ),
  quality: PropTypes.number,
};

Img.defaultProps = {
  url: false,
  rects: [
    { width: 240, height: 150 },
    { width: 480, height: 300 },
    { width: 960, height: 600 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1200 },
  ],
  sizes:
    '(max-width: 240px) 240w, (max-width: 480px) 480w,(max-width: 960px) 960w, (max-width: 1440px) 900w, 1920w',
  quality: 80,
};
