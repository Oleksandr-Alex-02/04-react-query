
import axios from "axios";
import { Movie } from '../types/movie'

interface MovieResponse {
    results: Movie[];
}

const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const getMovies = async (query: string): Promise<Movie[]> => {

    const response = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/search/movie",
        {
            params: {
                query: query,
                include_adult: false,
                language: "en-US",
                page: 1,
                total_page: 5
            },
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${VITE_TMDB_TOKEN}`
            }
        }
    );
    return response.data.results;
}