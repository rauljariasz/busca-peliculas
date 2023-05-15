import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App() {
 /*  const API_KEY = 'f150e391'
  const API = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}` */

  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search })

  const handleChange = (e) => {
    const newSearch = e.target.value
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies()
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
          <Movies movies={movies} />
        </section>
      </main>
    </>
  )
}

export default App
