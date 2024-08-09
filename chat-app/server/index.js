import express from 'express'
import logger from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config()

const port = process.env.PORT ?? 3000
const app = express();
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

const db = createClient({
  url: 'libsql://sharp-the-call-chaos.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjMxNjk1MDYsImlkIjoiOGE2NjFjZWMtMjE2NC00NWRkLWI5NGQtNTI4YzIxZmUzNWNhIn0.ErPZdDE1gdgKkF3eQ-bQLNrwmE2xOGxvZjpm2Mv6yGuOcP0t5D0_anhkcA-GnnnKUyczSCwzNa-L3K9nKjkIBQ'
})


await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT
  )
`)

io.on('connection', (socket) => {
  console.log('a user has connected!!')

  socket.on('disconnect', () => {
    console.log('a user has disconnected!!')
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })

})


app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})
server.listen(port, () => {
  console.log(`server listening on port ${port}`)
});