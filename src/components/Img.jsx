import React from 'react';
import PropTypes from 'prop-types';

const Img = ({url, sizes, quality}) => {
  const srcSetWebpArray = [250, 500, 1000, 1500, 2000].map(width => {
    return `${url}?w=${width}&q=${quality}&fm=webp ${width}w`
  })
  const srcSetWebp = srcSetWebpArray.join(',')
  const srcSetOriginArray = [250, 500, 1000, 1500, 2000].map(width => {
    return `${url}?w=${width}&q=${quality} ${width}w`
  })
  const srcSetOrigin = srcSetOriginArray.join(',')
  return (
    <>
      {url &&
        <picture>
          <source type="image/webp" srcSet={srcSetWebp}
            sizes={sizes}
          />
          <source srcSet={srcSetOrigin}
            sizes={sizes}
          />
          <img
            srcSet={srcSetOrigin}
            alt=""
            loading="lazy"
            sizes={sizes}
          />
        </picture>
      }
    </>
  )
}

export default Img

Img.propTypes = {
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sizes: PropTypes.string,
  quality: PropTypes.number
};

Img.defaultProps = {
  url: false,
  sizes: "(max-width: 25px) 250px, (max-width: 500px) 500px,(max-width: 1000px) 1000px, (max-width: 1500px) 1500px, 2000px",
  quality: 80
}
