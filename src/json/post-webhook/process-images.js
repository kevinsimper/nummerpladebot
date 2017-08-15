var openalpr = require('./openalpr')
var sendTextMessage = require('./send-text')
var lookup = require('./lookup')

module.exports = function (senderID, item) {
  openalpr(item.payload.url, (err, result) => {
    console.log(typeof result)
    if(result.results.length === 0) {
      sendTextMessage(senderID, '0 cars found!')
    }
    result.results.forEach(item => {
      sendTextMessage(senderID, `Found car ${item.plate}, ${item.confidence} % sure!`)
      lookup(item.plate, (err, data) => {
        console.log(data)
        sendTextMessage(senderID, `Dug up the VIN also, ${data.TekniskData.StelNr}`)
      })
    })
  })
}
