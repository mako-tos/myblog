import React, { useEffect, useRef } from 'react';
import LazyLoad from 'react-lazyload';
import ExecutionEnvironment from 'exenv';

const twitterWidgetJs = 'https://platform.twitter.com/widgets.js';

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
  return text
}

const ShareImpl = ({ text }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }
    const scriptjs = require('scriptjs');
    scriptjs(twitterWidgetJs, 'twitter-embed', () => {
      if (!window.twttr) {
        console.error(
          'Failure to load window.twttr in ShareImpl, aborting load.'
        );
        return;
      }
      window.twttr.widgets.createShareButton(
        window.location.href,
        containerRef.current,
        { text: text }
      );
    });
  }, []);
  return <div ref={containerRef} />;
};

const ShareButton = ({ post }) => {
  const text = createText(post)
  return (
    <>
    	<amp-social-share
        data-param-text={text}
        type="twitter">
      </amp-social-share>
      <LazyLoad once offset={200}>
        <ShareImpl text={text} />
      </LazyLoad>
    </>
  );
};

export default ShareButton;
