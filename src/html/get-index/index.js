var arc = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))

  res({html: 'Hello world!'})
}

exports.handler = arc.html.get(route)
