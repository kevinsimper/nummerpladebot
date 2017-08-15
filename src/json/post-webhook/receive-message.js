var sendTextMessage = require('./send-text')
var openalpr = require('./openalpr')
var processImage = require('./process-images')

function receivedMessage(event) {
  var senderID = event.sender.id
  var recipientID = event.recipient.id
  var timeOfMessage = event.timestamp
  var message = event.message

  console.log(
    'Received message for user %d and page %d at %d with message:',
    senderID,
    recipientID,
    timeOfMessage
  )
  console.log(JSON.stringify(message))

  var messageId = message.mid

  var messageText = message.text
  var messageAttachments = message.attachments

  if (messageText) {
    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        sendGenericMessage(senderID)
        break

      default:
        sendTextMessage(
          senderID,
          'Hi, submit a picture that you want to analyze for a licenseplate!'
        )
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, 'Analyzing picture')
    message.attachments.forEach(item => {
      if (item.type === 'image') {
        processImage(senderID, item)
      }
    })
  }
}

module.exports = receivedMessage
