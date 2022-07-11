import {MoviesFilterStrategyInterface} from "./MoviesFilterStrategyInterface";
import {Movie} from "../../entity/Movie";
import {GetMoviesDTO} from "../../../application/dto/GetMoviesDTO";

export class DurationMoviesFilter implements MoviesFilterStrategyInterface {
    public static DURATION_TOLERANCE = 10;

    public async filter(movies: Movie[], getMoviesDTO: GetMoviesDTO): Promise<Movie[]> {
        if (!getMoviesDTO.duration) {
            throw new Error('Duration movies filter require duration parameter to be passed by GetMoviesDTO.')
        }

        const minDuration: number = getMoviesDTO.duration - DurationMoviesFilter.DURATION_TOLERANCE;
        const maxDuration: number = getMoviesDTO.duration + DurationMoviesFilter.DURATION_TOLERANCE;

        // TODO implement truly async filter method
        const resultMovies = movies.filter((movie: Movie) => {
            const movieRuntime: number = Number(movie.getRuntime());

            return (movieRuntime > minDuration) && (movieRuntime < maxDuration);
        })

        return Promise.resolve(resultMovies);
    }
}