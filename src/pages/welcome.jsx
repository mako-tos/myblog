import React from 'react';
import { SEO } from '../components';
import PropTypes from 'prop-types';
import { Header } from 'components';
import { Layout, Container } from 'layouts';
import 'react-netlify-identity-widget/styles.css';

const Welcome = (center) => (
  <Layout>
    <SEO title={'ようこそいらっしゃいました'} pathname={center.location.pathname} />
    <Header title="ようこそいらっしゃいました" />
    <Container center={center}>
      <h1>ようこそいらっしゃいました</h1>
      <p>ユーザー登録をお願い致します。</p>
    </Container>
  </Layout>
);

export default Welcome;

Welcome.propTypes = {
  center: PropTypes.object,
};
