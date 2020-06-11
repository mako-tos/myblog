import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

const Wrapper = styled.div`
`;

const FooterSocial = ({ config }) => {
  return (
    <Wrapper>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://github.com/${config.github}`}
        itemProp="url"
      >
        <FontAwesomeIcon icon={faGithub} width="16" height="16" />
      </a>

      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/${config.twitter}`}
        itemProp="url"
      >
        <FontAwesomeIcon icon={faTwitterSquare} width="16" height="16" />
      </a>
    </Wrapper>
  );
};
export default FooterSocial;
