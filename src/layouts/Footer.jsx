import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faGithub } from '@fortawesome/free-brands-svg-icons';
import config from '../../config/site';

const Wrapper = styled.footer`
  position: relative;
  padding-top: 2rem;
  bottom: 0;
  box-shadow: ${props => props.theme.shadow.footer};
  background: ${props => props.theme.gradient.leftToRight};
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 500;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding-top: 7rem;
  }
  display: flex;
  justify-content: space-around;
`;

const Text = styled.div`
  margin: 0;
  padding-bottom: 2rem;
  text-align: center;
  color: ${props => props.theme.colors.white.light};
  a {
    margin-left: 0.5em;
    color: ${props => props.theme.colors.white.light};
  }
`;

const Footer = () => (
  <Wrapper
    role="contentinfo"
    itemScope="itemscope"
    itemType="http://schema.org/WPFooter"
  >
    <Text>
      ©
      <span
        itemProp="author name"
        itemScope
        itemType="http://schema.org/Person"
      >
        {config.author}
      </span>
    </Text>
    <Text>
      <FontAwesomeIcon icon={faTwitterSquare} />
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/${config.twitter}`}
        itemProp="url"
      >
        {config.twitter}
      </a>
    </Text>
    <Text>
      <FontAwesomeIcon icon={faGithub} />
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://github.com/${config.github}`}
        itemProp="url"
      >
        {config.github}
      </a>
    </Text>
  </Wrapper>
);
export default Footer;
