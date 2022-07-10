import { Movie } from "../../entity/Movie";

export interface MoviesFilterStrategyInterface {
    filter(movies: Movie[]): Promise<Movie[]>;
}