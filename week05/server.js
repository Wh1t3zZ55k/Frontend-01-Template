const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  console.log(req.headers)
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('okokoko')
})

server.listen(8088)