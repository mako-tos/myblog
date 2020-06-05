/**
 * postからpathを作成する
 * @param {object} post
 * @returns {string} url
 */
const createPath = post => {
  return `/post/${post.createdAt}-${post.slug}`;
}

module.exports = {
  createPath: createPath,
};
