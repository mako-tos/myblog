import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

/**
 * パスカルケースへ変換 PampleString
 * @param {string}
 * @return {string}
 */
const pascalCase = str => {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace(/[-_\.](.)/g, function(match, group1) {
    return group1.toUpperCase();
  });
};

/**
 * 記事情報からシェアボタンのテキストを作る
 * @param {object} post
 * @returns {string}
 */
const createText = post => {
  const tags = post.tags.map(tag => `#${pascalCase(tag.slug)}`).join(' ');
  const text = `${post.title} ${tags}`;
  return encodeURIComponent(text);
};

const TwitterShare = ({ post, location }) => {
  const text = createText(post);
  const url = encodeURIComponent(location.href);
  const twitterURL = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
  return (
    <a href={twitterURL} target="_blank" rel="nofollow">
      <FontAwesomeIcon icon={faTwitter} width="16" height="16" />
      share
    </a>
  );
};

export default TwitterShare;

TwitterShare.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.array,
  }),
  location: PropTypes.object.isRequired,
};
