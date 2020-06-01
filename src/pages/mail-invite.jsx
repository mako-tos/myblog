import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Header } from 'components';
import { Layout, Container } from 'layouts';
import config from '../../config/site';

const MailInvite = center => (
  <Layout>
    <Helmet title={'ご招待'} />
    <Header title="ご招待" />
    <Container center={center}>
      <h1>あなたを {config.siteUrl} の運営にご招待致しました</h1>
      <p>あなたを {config.siteUrl} にご招待いたしました。</p>
      <p><a href="{{ .SiteURL }}/welcome/#invite_token={{ .Token }}">こちら</a>からユーザ登録をお願い致します。</p>
    </Container>
  </Layout>
);

export default MailInvite;

MailInvite.propTypes = {
  center: PropTypes.object,
};
