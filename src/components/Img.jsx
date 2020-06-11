import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Image = styled.div`
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const WrapperPicture = styled.picture`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
`;

const Img = ({fluid, alt}) => {
  return (
    <Image>
      <WrapperPicture>
        <source type="image/webp" srcSet={fluid.srcSetWebp}
          sizes={fluid.sizes}
        />
        <source srcSet={fluid.srcSet}
          sizes={fluid.sizes}
        />
        <img
          srcSet={fluid.srcSet}
          src={fluid.src}
          alt={alt}
          loading="lazy"
          sizes={fluid.sizes}
        />
      </WrapperPicture>
    </Image>
  )
}
export default Img
Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  alt: PropTypes.string,
  sizes: PropTypes.string,
};
Img.defaultProps = {
  src: false,
  alt: '',
  sizes: '100vw',
}