import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import LazyLoad from 'react-lazyload';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const TwitterPlaceholderWrapper = styled.div`
  color: ${props => props.theme.colors.white.light};
  a {
    margin-left: 0.5em;
    color: ${props => props.theme.colors.white.light};
  }
`;

const TwitterPlaceholder = ({user}) => (
  <TwitterPlaceholderWrapper>
    <FontAwesomeIcon icon={faTwitterSquare} />
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://twitter.com/${user}`}
      itemProp="url"
    >
      {user}
    </a>
  </TwitterPlaceholderWrapper>
);

const FooterTwitter = ({user}) => (
  <Wrapper>
    <LazyLoad once placeholder={<TwitterPlaceholder user={user} />}>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={user}
        options={{ height: 400, lang: 'ja' }}
      />
    </LazyLoad>
  </Wrapper>
);
export default FooterTwitter;
