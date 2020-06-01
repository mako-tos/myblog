import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { PostPage } from 'components';

const getRelationPosts = ({ slug, tags }, allPosts, maxCount) => {
  const postList = allPosts.filter(post => post.slug !== slug);
  const scoreList = [];
  postList.forEach((post, index) => {
    scoreList.push({
      score: 0,
      index,
      createdAt: post.createdAt,
      slug: post.slug,
      title: post.title,
      tagSlugs: post.tags.map(tag => tag.slug),
      childMicrocmsImage: post.childMicrocmsImage,
    });
  });
  tags.forEach(tag => {
    scoreList.forEach(score => {
      if (score.tagSlugs.indexOf(tag.slug) >= 0) {
        score.score += 1;
      }
    });
  });
  const sortedList = scoreList.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
      return 1;
    }
    if (a.index > b.index) {
      return 1;
    } else if (a.index < b.index) {
      return -1;
    }
    return 0;
  });
  return sortedList.slice(0, maxCount);
};

const Post = ({ data, pageContext, location }) => {
  const relatedPosts = getRelationPosts(
    data.microcmsBlog,
    pageContext.allPosts,
    3
  );
  return (
    <PostPage
      data={data.microcmsBlog}
      siteMetadata={data.site.siteMetadata}
      pageContext={pageContext}
      location={location}
      relatedPosts={relatedPosts}
    />
  );
};

export default Post;

Post.propTypes = {
  pageContext: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
    allPosts: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        tags: PropTypes.array,
        createdAt: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        childMicrocmsImage: PropTypes.object,
      })
    ),
  }).isRequired,
  data: PropTypes.shape({
    microcmsBlog: PropTypes.shape({
      body: PropTypes.string.isRequired,
      digest: PropTypes.string,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      childMicrocmsImage: PropTypes.object,
      tags: PropTypes.array,
    }),
  }),
};

export const query = graphql`
  query($blogId: String!) {
    site {
      siteMetadata {
        author
        logo
        siteUrl
      }
    }
    microcmsBlog(blogId: { eq: $blogId }) {
      body
      digest
      title
      slug
      createdAt(formatString: "YYYY-MM-DD")
      updatedAt(formatString: "YYYY-MM-DD")
      childMicrocmsImage {
        childFile {
          childImageSharp {
            fluid(quality: 80, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      tags {
        slug
        title
      }
      childCheerioHtml {
        html
        hljsHtml
        plainText
      }
    }
  }
`;
