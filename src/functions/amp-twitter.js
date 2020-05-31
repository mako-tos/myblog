/**
 * amp-twitterを作成する
 * scriptの読み込み設定もする
 * @param {Cheerio} $ 
 * @param {string} twitterAccount 
 * @param {string} targetSelector 
 * @returns {Cheerio} $
 */
const ampTwitter = ($, twitterAccount, targetSelector) => {
  if (!twitterAccount) {
    return $;
  }
  $('head').append(
    '<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>'
  );
  $(targetSelector).html(`
    <amp-twitter
      data-timeline-source-type="profile"
      data-timeline-screen-name="${twitterAccount}"
      width="300"
      height="400"
      sizes="(min-width: 600px) 90vw, 300px"
      layout="responsive">
    </amp-twitter>
  `);
  return $;
};

module.exports = { ampTwitter };
