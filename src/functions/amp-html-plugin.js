const cheerio = require('cheerio');
const { ampPicture } = require('./amp-picture');
const { ampTwitter } = require('./amp-twitter');
const { ampNoscript } = require('./amp-noscript');
const config = require('../../config/site');

/**
 * html2amp(pluginも非同期版)のhtmlPlugin
 * @param {string} html 
 * @param {object} options
 * @return {Promise<string>} Promise(html) 
 */
const htmlPlugin = async (html, options) => {
  let $ = cheerio.load(html);
  $ = ampNoscript($);
  $ = ampTwitter($, config.twitter, '#twitter-container');
  $ = await ampPicture($, options);

  return $.html();
};

module.exports = htmlPlugin;
