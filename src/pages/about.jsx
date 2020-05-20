import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Header } from 'components';
import { Layout, Container } from 'layouts';
import config from '../../config/site';

const About = center => (
  <Layout>
    <Helmet title={'About Page'} />
    <Header title="About Page">{config.title}</Header>
    <Container center={center}>
      <h3>
        このサイトは私mako-tosが管理運営しているページです
      </h3>
    </Container>
  </Layout>
);

export default About;

About.propTypes = {
  center: PropTypes.object,
};
