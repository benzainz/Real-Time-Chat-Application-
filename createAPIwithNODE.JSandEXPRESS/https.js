const http = require('node:http')

const desiredPort = process.env.PORT ?? 1235

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.end('<h1>my page</h1>')
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404// not found
    res.end('<h1>404</h1>')
  }
}
const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})

// const server = http.createServer((req, res) => {
//   console.log('request received: ', req.url)
//   res.end('hola mundo di ronaldo')
// })

// })
