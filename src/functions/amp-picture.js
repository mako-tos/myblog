/**
 * html2ampから拝借sしたソースを基にしている
 */

const utils = require('./amp-utils');

const sourceToAmp = async (nodes, options, imgAttr) => {
  const sourcePromises = nodes
    .map(async (i, source) => {
      const ampTag = await utils.srcNode(options.cwd, {
        ...imgAttr,
        ...source.attribs,
      });
      return ampTag;
    })
    .get();
  const amps = await Promise.all(sourcePromises);
  return amps;
};

const imgToAmp = async (node, options) => {
  const tag = await utils.srcNode(options.cwd, {
    fallback: '',
    ...node.attribs,
  });
  return tag;
};

/**
 * 画像を判定して良しなにする
 * @param {Cheerio}} $ 
 * @param {object} options
 * @returns {Promise<Cheerio>} 
 */
const ampPicture = async ($, options = {}) => {
  const pictureElements = $('picture');
  const promises = pictureElements.map(async (i, node) => {
    const element = $(node);
    const img = element.find('img').get(0);

    // source tag
    const [main, ...rests] = await sourceToAmp(
      element.find('source'),
      options,
      img.attribs
    );
    const mainAmp = $(main);
    mainAmp.append(rests.join(''));
    // img tag
    const ampStr = await imgToAmp(img, options);
    mainAmp.append(ampStr);
    element.replaceWith(mainAmp);
  }).toArray();
  await Promise.all(promises);
  return $;
};

module.exports = { ampPicture };
