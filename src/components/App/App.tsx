
import css from './App.module.css'
import toast, { Toaster } from 'react-hot-toast'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Movie } from '../../types/movie'
import { getMovies } from '../../services/moviesService'

import SearchBar from '../SearchBar/SearchBar'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'

const notify = () => toast('No movies found for your request.')

export default function App() {
  const [search, setSearch] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ['movies', search],
    queryFn: () => getMovies(search),
    enabled: !!search,
  });

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleMovieClick = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <>
      <div className={css.app}>
        <SearchBar onSubmit={handleSearch} />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {movies && movies.length === 0 && notify()}
        {movies && <MovieGrid movies={movies} onSelect={handleMovieClick} />}
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