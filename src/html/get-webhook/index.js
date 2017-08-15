var arc = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'kevin') {
    console.log("Validating webhook");
    res({html: req.query['hub.challenge']})
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res({
      status: 403,
      html: "Failed validation!"
    });
  }
}

exports.handler = arc.html.get(route)
