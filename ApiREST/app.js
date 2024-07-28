const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

// muestrame lo q hay en el archivo movies cada vez q use /movies
app.get('/movies', (req, res) => {
  res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path to regexp
  const id = req.params.id
  //const movie = movies.find(movie => movie.id === id)// La func => evalúa si la propiedad id del objeto movie es = al valor de id que se está buscando.
  const movie = movies.find(function (movie) {
    return movie.id === id
  })
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })

  // if (movie) return res.json(movie)
  // res.status(404).json({ message: 'Movie not found' })
  // })

  const PORT = process.env.PORT ?? 1235

  app.listen(PORT, () => {
    console.log(`server listening on por http://localhost:${PORT}`)
  })
