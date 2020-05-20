import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Container } from 'layouts';
import { Header, TagsBlock } from 'components';
import config from '../../config/site';

const Tags = ({ pageContext }) => {
  const { tags } = pageContext;

  return (
    <Layout>
      <Header title="Tags Page">{config.title}</Header>
      <Container>
        <TagsBlock list={tags} />
      </Container>
    </Layout>
  );
};

export default Tags;

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};
