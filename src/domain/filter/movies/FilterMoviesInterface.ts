import { Movie } from "../../entity/Movie";
import { MoviesFilterStrategyInterface } from "./MoviesFilterStrategyInterface";

export interface FilterMoviesInterface {
    filter(movies: Movie[]): Promise<Movie[]>;
    setFilterStrategy(filterStrategy: MoviesFilterStrategyInterface): void;
}