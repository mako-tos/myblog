import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Header } from 'components';
import { Layout, Container } from 'layouts';

const ErrorPage = center => (
  <Layout>
    <Helmet title={'404'} />
    <Header title="404" />
    <Container center={center}>
      <h1>ごめんね見つからなかった.</h1>
      <h3>もうないのかも.</h3>
      <h3>
        <Link to="/">ホームへ戻る</Link>.
      </h3>
    </Container>
  </Layout>
);

export default ErrorPage;

ErrorPage.propTypes = {
  center: PropTypes.object,
};
