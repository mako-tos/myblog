import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { PostPage } from 'components';

const Post = ({ data, pageContext }) => {
  return (
    <PostPage data={data.microcmsBlog} pageContext={pageContext} />
  );
};

export default Post;

Post.propTypes = {
  pageContext: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
  }).isRequired,
  data: PropTypes.shape({
    microcmsBlog: PropTypes.shape({
      body: PropTypes.string.isRequired,
      digest: PropTypes.string,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      headImage: PropTypes.object.isRequired,
      tags: PropTypes.array,
    }),
  }),
};

export const query = graphql`
  query($blogId: String!) {
    microcmsBlog(blogId: { eq: $blogId }) {
      body
      digest
      title
      slug
      createdAt(formatString: "YYYY-MM-DD")
      updatedAt(formatString: "YYYY-MM-DD")
      headImage {
        url
      }
      tags {
        slug
        title
      }
    }
  }
`;
