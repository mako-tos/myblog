import React, { useEffect, useRef } from 'react';
import LazyLoad from 'react-lazyload';
import ExecutionEnvironment from 'exenv';

const twitterWidgetJs = 'https://platform.twitter.com/widgets.js';

const TimeLineImpl = ({ sourceType, screenName, options }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }
    const scriptjs = require('scriptjs');
    scriptjs(twitterWidgetJs, 'twitter-embed', () => {
      if (!window.twttr) {
        console.error(
          'Failure to load window.twttr in TimeLineImpl, aborting load.'
        );
        return;
      }
      
      window.twttr.widgets.load(containerRef.current)
      window.twttr.widgets.createTimeline(
        {
          sourceType,
          screenName,
        },
        containerRef.current,
        options
      );
    });
  }, []);
  return <div ref={containerRef} />;
};

const TimeLine = ({ placeholder, sourceType, screenName, options }) => {
  return (
    <LazyLoad placeholder={placeholder} once offset={200}>
      <TimeLineImpl
        sourceType={sourceType}
        screenName={screenName}
        options={options}
      />
    </LazyLoad>
  );
};

export default TimeLine;
