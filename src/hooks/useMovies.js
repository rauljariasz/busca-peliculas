import { useState } from 'react'
import response from '../mocks/response.json'
import woResponse from '../mocks/woResponse.json'

export function useMovies({ search }) {
  const [responseMovies, setResponseMovies] = useState([])

  const movies = responseMovies.Search

  const mapMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    poster: movie.Poster,
    year: movie.Year
  }))

  const getMovies = () => {
    if (search) {
      // setResponseMovies(response)
      fetch(`http://www.omdbapi.com/?apikey=f150e391&s=${search}`)
        .then(res => res.json())
        .then(json => {
          setResponseMovies(json)
        })
    } else {
      setResponseMovies(woResponse)
    }
  }

  return { movies: mapMovies, getMovies }
}