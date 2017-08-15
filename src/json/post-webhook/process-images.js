var openalpr = require('./openalpr')
var sendTextMessage = require('./send-text')

module.exports = function (senderID, item) {
  openalpr(item.payload.url, (err, result) => {
    console.log(typeof result)
    if(result.results.length === 0) {
      sendTextMessage(senderID, '0 cars found!')
    }
    result.results.forEach(item => {
      sendTextMessage(senderID, `Found car ${item.plate}, ${item.confidence} % sure!`)
    })
  })
}
