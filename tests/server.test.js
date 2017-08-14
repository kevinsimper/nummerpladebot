let arc = require('@architect/workflows')

let server
test('that we can start local server', done => {
  expect.assertions(1)
  server = arc.sandbox.http.start(() => {
    expect(true).toBe(true)
    done()
  })
})

test('server close', () => {
  server.close()
})
