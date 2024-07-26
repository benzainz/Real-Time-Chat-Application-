const http = require('node:http')
const desiredPort = process.env.PORT ?? 1235

const server = http.createServer((req, res) => {
  console.log('request received: ', req.url)
  res.end('hola mundo di ronaldo')
})

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
