
import css from './App.module.css'
import toast, { Toaster } from 'react-hot-toast'

import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import ReactPaginate from 'react-paginate';
import { Movie } from '../../types/movie'
import { getMovies } from '../../services/moviesService'

import SearchBar from '../SearchBar/SearchBar'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'

const notify = () => toast('No movies found for your request.')

export default function App() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', search, currentPage],
    queryFn: () => getMovies(search, currentPage),
    enabled: search !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages || 0;
  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleMovieClick = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <>
      <div className={css.app}>
        <SearchBar onSubmit={handleSearch} />
        {totalPages > 1 && <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={3}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />}
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {data?.results && data.results.length === 0 && notify()}
        {data?.results && <MovieGrid movies={data.results} onSelect={handleMovieClick} />}
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