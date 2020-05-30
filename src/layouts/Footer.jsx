import React from 'react';
import styled from '@emotion/styled';
import config from '../../config/site';
import { FooterGithub, FooterTwitter } from '../components'

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
  @media (min-width: ${props => props.theme.breakpoints.m}) {
    display: flex;
  }
  justify-content: space-around;
`;

const Text = styled.div`
  margin: 0;
  padding-bottom: 2rem;
  text-align: center;
  flex: 1;
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
      <FooterGithub user={config.github} />
    </Text>
    <Text>
      <FooterTwitter user={config.twitter} />
    </Text>
  </Wrapper>
);
export default Footer;
