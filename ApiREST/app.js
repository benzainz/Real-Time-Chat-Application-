const { validateMovie } = require('./schema/movies')
const express = require('express')/** ¿Qué es Express? Es un Framework de Node.js: Express se ejecuta sobre Node.js,
lo que permite utilizar JavaScript tanto en el frontend como en el backend. */
const crypto = require('crypto') // permite crear id unicas
const movies = require('./movies.json')
const app = express()

app.use(express.json())// middleware en Express.js q se utiliza para analizar (parsear) el cuerpo de las solicitudes HTTP con formato JSON.
app.disable('x-powered-by')

app.get('/movies', function (req, res) {
  const genre = req.query.genre // ve y trae el parametro genre de la http
  if (genre) { // si existe el genero entonces
    const filteredMovies = movies.filter(function (movie) { // filtrar las peliculas q tienen el genero especificado
      return movie.genre.some(function (g) { // comprobar si al menos uno de los generos de la pelicula coincide
        return g.toLowerCase() === genre.toLowerCase()
      })
    })
    // Devolver las películas filtradas en formato JSON
    return res.json(filteredMovies)
  }
  // Si no existe el género, devolver todas las películas en formato JSON
  res.json(movies)
})

// muestrame las movies por su id
app.get('/movies/:id', (req, res) => { // path to regexp
  const id = req.params.id
  const movie = movies.find(function (movie) {
    return movie.id === id
  })
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

// POST = CREAR
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  }

  // eso no seria REST,pq estamos guardando el estado de la ap en memoria
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 1235

app.listen(PORT, () => {
  console.log(`server listening on por http://localhost:${PORT}`)
})
