import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Header } from 'components';
import { Layout, Container } from 'layouts';
import config from '../../config/site';

const MailConfirm = center => (
  <Layout>
    <Helmet title={'サインアップのご確認'} />
    <Header title="サインアップのご確認" />
    <Container center={center}>
      <h1>サインアップのご確認が必要です</h1>
      <p><a href="{{ .SiteURL }}/welcome/#confirmation_token={{ .Token }}">こちら</a>をクリックお願いします。</p>
    </Container>
  </Layout>
);

export default MailConfirm;

MailConfirm.propTypes = {
  center: PropTypes.object,
};
