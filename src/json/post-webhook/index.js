var arc = require('@architect/functions')
var receivedMessage = require('./receive-message')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  const data = req.body

  if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id
      var timeOfEvent = entry.time

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event)
        } else {
          console.log('Webhook received unknown event: ', event)
        }
      })
    })
  }

  res({
    json: {
      status: 'received'
    }
  })
}

exports.handler = arc.json.post(route)
