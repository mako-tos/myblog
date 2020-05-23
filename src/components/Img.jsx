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

  const createURL = (size, isWebp) => {
    const fixedUrl = new URL(url)
    const params = fixedUrl.searchParams
    params.append('fit', 'crop')
    if (size.width) {
      params.append('w', size.width)
    }
    if (size.height) {
      params.append('h', size.height)
    }
    params.append('q', quality)
    if (isWebp) {
      params.append('fm', 'webp')
    }
    return fixedUrl.href
  }

  const srcSetWebpArray = rects.map(size => {
    const ary = [createURL(size, true)]
    if (size.width) {
      ary .push(`${size.width}w`)
    }
    return ary.join(' ');
  });
  const srcSetWebp = srcSetWebpArray.join(',');
  const srcSetOriginArray = rects.map(size => {
    const ary = [createURL(size, false)]
    if (size.width) {
      ary.push(`${size.width}w`)
    }
    return ary.join(' ');
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
    { width: 240 },
    { width: 480 },
    { width: 720 },
    { width: 960 },
    { width: 1440 },
    { width: 1920 },
  ],
  sizes:
    '(max-width: 240px) 240px, (max-width: 480px) 480px, (max-width: 720px) 720px, (max-width: 960px) 960px, (max-width: 1440px) 1440px, 1920px',
  quality: 80,
};
