/**
 * postからpathを作成する
 * @param {object} post
 * @returns {string} url
 */
export const createPath = post => {
  return `${post.createdAt}-${post.slug}`
}

/**
 * htmlをplain textにして先頭length分だけ切り取る
 * @param {string} html 
 * @param {number} length
 * @returns {string} short text
 */
export const excerpt = (html, length) => {
  const regex = /(<([^>]+)>)/ig
  const planText = html.replace(regex, '')
  return planText.substr(0, length)
}
