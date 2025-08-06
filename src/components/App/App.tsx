
import css from './App.module.css'
import toast, { Toaster } from 'react-hot-toast'

import { useState } from 'react'
import { Movie } from '../../types/movie'
import { getMovies } from '../../services/moviesService'

import SearchBar from '../SearchBar/SearchBar'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'

const notify = () => toast('No movies found for your request.')

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setLoading(true);
      setError(false);
      const newArticles = await getMovies(query);

      if (newArticles.length === 0) {
        notify()
      }
      setMovies(newArticles)
    }
    catch {
      setError(true)
    }
    finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <>
      <div className={css.app}>
        <SearchBar onSubmit={handleSearch} />
        {loading && <Loader />}
        {error && <ErrorMessage />}
        <MovieGrid movies={movies} onSelect={handleMovieClick} />
        {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
        <Toaster toastOptions={{
          className: '',
          style: {
            background: '#ebcecbff',
            border: '2px solid #713200',
            padding: '16px',
            color: '#0c0c0cff',
          },
        }} />
      </div>
    </>
  )
}