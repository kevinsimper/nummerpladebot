let arc = require('@architect/workflows')
let http = require('tiny-json-http')

let server
test('that we can start local server', done => {
  expect.assertions(1)
  server = arc.sandbox.http.start(() => {
    expect(true).toBe(true)
    done()
  })
})

test('verify webhook', done => {
  console.log('verify')
  http.get({url: 'http://localhost:3333/webhook?hub.mode=subscribe&hub.challenge=2074033603&hub.verify_token=kevin'}, (err, res) => {
    console.log(err)
    expect(res.body).toBe('2074033603')
    done()
  })
})

test('server close', () => {
  server.close()
})
