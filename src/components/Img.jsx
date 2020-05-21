import React from 'react';
import PropTypes from 'prop-types';

const Img = ({url, sizes, quality, width, height}) => {
  if (!url) {
    return (<></>)
  }
  if (width && height) {
    const webp = `${url}?fit=crop&w=${width}&h=${height}&q=${quality}&fm=webp ${width}w`
    const original = `${url}?fit=crop&w=${width}&h=${height}&q=${quality} ${width}w`
    const size = `${width}px`
    return (
      <picture>
        <source type="image/webp" srcSet={webp}
          sizes={size}
        />
        <source srcSet={original}
          sizes={size}
        />
        <img
          src={url}
          alt=""
          loading="lazy"
          sizes={original}
        />
      </picture>
    )
  }
  const srcSetWebpArray = [250, 500, 1000, 1500, 2000].map(w => {
    return `${url}?w=${w}&q=${quality}&fm=webp ${w}w`
  })
  const srcSetWebp = srcSetWebpArray.join(',')
  const srcSetOriginArray = [250, 500, 1000, 1500, 2000].map(w => {
    return `${url}?w=${w}&q=${quality} ${w}w`
  })
  const srcSetOrigin = srcSetOriginArray.join(',')
  return (
    <picture>
      <source type="image/webp" srcSet={srcSetWebp}
        sizes={sizes}
      />
      <source srcSet={srcSetOrigin}
        sizes={sizes}
      />
      <img
        src={url}
        alt=""
        loading="lazy"
        sizes={sizes}
      />
    </picture>
  )
}

export default Img

Img.propTypes = {
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sizes: PropTypes.string,
  quality: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
};

Img.defaultProps = {
  url: false,
  sizes: "(max-width: 250px) 250px, (max-width: 500px) 500px,(max-width: 1000px) 1000px, (max-width: 1500px) 1500px, 2000px",
  quality: 80,
  width: null,
  height: null
}
