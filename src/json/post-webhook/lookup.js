var request = require('request')

function lookup(licenseplate, callback) {
  request({
    method: 'get',
    json: true,
    url: 'http://www.tjekbil.dk/api/db-nummerplade/' + licenseplate
  }, function (err, req, body) {
    console.log(err, body)
    callback(err, body)
  })
}

module.exports = lookup

// lookup('BN36420', () => {})
