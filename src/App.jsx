import { useMemo } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search })

  const debouncedGetMovies = useMemo(() => {
    return debounce(search => {
    console.log('search', search);
    getMovies({ search })
  }, 500)}
  ,[getMovies])

  const handleChange = (e) => {
    const newSearch = e.target.value
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input 
            onChange={handleChange}
            value={search}
            name='search'
            type="text" 
            placeholder='Avengers, Fast and Furious, Harry Potter, etc...'
          />
          <button type='submit'>Search</button>
        </form>
        {error && <p 
          style={{textAlign: 'center', color: 'red', marginTop: '20px'}}
        >
          {error}
        </p>}
      </header>

      <main>
        <section>
          {
            loading ? <p style={{textAlign: 'center'}}>Cargando...</p> : <Movies movies={movies} />
          }
        </section>
      </main>
    </>
  )
}

export default App
