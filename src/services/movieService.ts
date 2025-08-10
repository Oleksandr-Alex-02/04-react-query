
import axios from "axios";
import { Movie, } from '../types/movie'

interface MovieResponse {
    results: Movie[];
    total_pages: number;
}

const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const getMovies = async (query: string, page: number): Promise<MovieResponse> => {

    const response = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/search/movie",
        {
            params: {
                query: query,
                include_adult: false,
                language: "en-US",
                page,
            },
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${VITE_TMDB_TOKEN}`
            }
        }
    );
    return response.data;
}

// movieService.ts
