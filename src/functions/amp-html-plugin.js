const cheerio = require('cheerio');
const { ampPicture } = require('./amp-picture');
const { ampNoscript } = require('./amp-noscript');

/**
 * html2amp(pluginも非同期版)のhtmlPlugin
 * @param {string} html 
 * @param {object} options
 * @return {Promise<string>} Promise(html) 
 */
const htmlPlugin = async (html, options) => {
  let $ = cheerio.load(html);
  $ = ampNoscript($);
  $ = await ampPicture($, options);

  return $.html();
};

module.exports = htmlPlugin;
