var arc = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))

  let expectedToken = 'sam'
  let resp = 'hej'

  // are we handling a verification request
  if (
    req.query['hub.mode'],
    req.query['hub.challenge'],
    req.query['hub.verify_token']
  ) {
    if (req.query['hub.verify_token'] === expectedToken) {
      res({
        html: req.query['hub.challenge']
      })
      return
    } else {
      resp = 'invalid params..'
    }
  } else { 
    resp = 'no params'
  }

  res({
    json: {
      'resp': resp
    }
  })
}

exports.handler = arc.html.get(route)
