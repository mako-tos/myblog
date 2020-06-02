/**
 * postからpathを作成する
 * @param {object} post
 * @returns {string} url
 */
const createPath = post => {
  return `post/${post.createdAt}-${post.slug}`;
}
/**
 * postからamp用のpathを作成する
 */
const createAmpPath = post => {
  return `amp/${createPath(post)}`;
}

module.exports = {
  createPath: createPath,
  createAmpPath: createAmpPath,
};
