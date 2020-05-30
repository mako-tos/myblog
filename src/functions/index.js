module.exports = {
  /**
   * postからpathを作成する
   * @param {object} post
   * @returns {string} url
   */
  createPath: post => {
    return `${post.createdAt}-${post.slug}`;
  },
};
