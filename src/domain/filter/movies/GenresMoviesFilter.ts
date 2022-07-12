import {MoviesFilterStrategyInterface} from "./MoviesFilterStrategyInterface";
import {Movie} from "../../entity/Movie";
import {GetMoviesDTO} from "../../../application/dto/GetMoviesDTO";

export class GenresMoviesFilter implements MoviesFilterStrategyInterface {
    async filter(movies: Movie[], getMoviesDTO: GetMoviesDTO): Promise<Movie[]> {
        if (
            !getMoviesDTO.genres
            || (getMoviesDTO.genres && !getMoviesDTO.genres.length)
        ) {
            throw new Error("Genres movies filter require genres parameter to be passed by GetMoviesDTO");
        }

        const genresToCheck = getMoviesDTO.genres;

        // TODO Implement async filter method
        movies = movies.filter((movie: Movie) => {
            if (!movie.getGenres().length) {
                return false;
            }

            for (let genre of movie.getGenres()) {
                if(genresToCheck.includes(genre)) {
                    return true;
                }
            }

            return false;
        })

        return Promise.resolve(movies);
    }
}