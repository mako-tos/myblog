import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Header } from 'components';
import { Layout, Container } from 'layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import config from '../../config/site';

const About = center => (
  <Layout>
    <Helmet title={'About Page'} />
    <Header title="About Page">{config.title}</Header>
    <Container center={center}>
      <h3>
        このサイトは私
        <a target="_blank" href={`https://twitter.com/${config.twitter}`}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a target="_blank" href={`https://github.com/${config.github}`}>
          <FontAwesomeIcon icon={faGithub} />
        </a>
        mako-tos
        が管理運営しているページです
      </h3>
    </Container>
  </Layout>
);

export default About;

About.propTypes = {
  center: PropTypes.object,
};
