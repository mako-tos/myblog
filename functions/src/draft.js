import fetch from 'node-fetch'
require('dotenv').config()

exports.handler = async function(event, context, callback) {
  const url = `https://${process.env.MICRO_CMS_SERVICE_ID}.microcms.io/api/v1/${process.env.MICRO_CMS_ENDPOINT}/${event.queryStringParameters.contentId}?draftKey=${event.queryStringParameters.draftKey}`
  try {
    const res = await fetch(url, {
      headers: {
        'X-API-KEY': process.env.MICRO_CMS_API_KEY
      }
    })
    const json = await res.json()
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(json),
    })
  } catch (e) {
    callback(null, {
      statusCode: 500,
      body: e.toString(),
    })
  }
}
