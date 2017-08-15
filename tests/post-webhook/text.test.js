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
  let examplepost = {
    object: 'page',
    entry: [
      {
        id: '229557634234995',
        time: 1502812631625,
        messaging: [
          {
            sender: {
              id: '1384083618356159'
            },
            recipient: {
              id: '229557634234995'
            },
            timestamp: 1502812628024,
            message: {
              mid: 'mid.$cAADQyDzsOYFkF-IsOFd5pzj0d7Gs',
              seq: 64708,
              text: 'test'
            }
          }
        ]
      }
    ]
  }
  http.post(
    { url: 'http://localhost:3333/webhook', data: examplepost },
    (err, res) => {
      expect(res.body).toEqual({ status: 'received' })
      done()
    }
  )
})

test('server close', () => {
  server.close()
})
