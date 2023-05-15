import { useState, useRef, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)

  const getMovies = useCallback(
    async ({ search }) => {
    if (search == previousSearch.current) return

    try {
      setLoading(true)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch(e) {
      console.error('Error en la aplicacion');
    } finally {
      setLoading(false)
    }
  }, [] )

  return { movies, getMovies, loading }
}