module.exports = {
  /**
   * postからpathを作成する
   * @param {object} post
   * @returns {string} url
   */
  createPath: post => {
    return `${post.createdAt}-${post.slug}`;
  },
  /**
   * htmlをplain textにして先頭length分だけ切り取る
   * @param {string} html
   * @param {number} length
   * @returns {string} short text
   */
  excerpt: (html, length) => {
    const regex = /(<([^>]+)>)/gi;
    const planText = html.replace(regex, '');
    return planText.substr(0, length);
  },
};
