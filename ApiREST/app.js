const express = require('express')
const movies = require('./movies.json')

const app = express()
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

const PORT = process.env.PORT ?? 1235

app.listen(PORT, () => {
  console.log(`server listening on por http://localhost:${PORT}`)
})
