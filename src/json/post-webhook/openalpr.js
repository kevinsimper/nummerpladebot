var request = require('request')

const SECRET = process.env.OPENALPR_SECRET

function openalpr(url, callback) {
  request(
    {
      method: 'post',
      url: 'https://api.openalpr.com/v2/recognize_url',
      json: true,
      form: {
        image_url: url,
        secret_key: SECRET,
        recognize_vehicle: 0,
        country: 'eu',
        return_image: 0
      }
    },
    function(err, res, body) {
      console.log('Got response from OPENALPR', err)
      console.log(body)
      callback(err, body)
    }
  )
}

module.exports = openalpr
