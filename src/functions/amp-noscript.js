/**
 * noscriptタグから画像を掘り出す
 * @param {Cheerio} $ 
 * @returns {Cheerio} $
 */
const ampNoscript = ($) => {
  $('div.gatsby-image-wrapper noscript').each((_, elem) => {
    const text = elem.children[0].data;
    const parent = $(elem).parent();
    $(elem).remove();
    return parent.append(text);
  });
  return $;
};

module.exports = { ampNoscript };