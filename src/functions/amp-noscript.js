/**
 * noscriptタグから画像を掘り出す
 * @param {Cheerio} $ 
 * @returns {Cheerio} $
 */
const ampNoscript = ($) => {
  $('div.gatsby-image-wrapper amp-img[src^="data:"]').remove();
  $('div.gatsby-image-wrapper noscript').each((_, elem) => {
    const text = $(elem).text();
    const parent = $(elem).parent();
    $(elem).remove();
    return parent.append(text);
  });
  return $;
};

module.exports = { ampNoscript };