
import axios from "axios";
import { Movie, Data } from '../types/movie'

interface MovieResponse {
    results: Movie[];
    nbPages: Data
}

const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const getMovies = async (query: string, page: number): Promise<Movie[]> => {

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
    console.log(response.data)
    return response.data;
}