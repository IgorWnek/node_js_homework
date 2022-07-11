import { Movie } from "../../entity/Movie";
import { MoviesFilterStrategyInterface } from "./MoviesFilterStrategyInterface";
import { GetMoviesDTO } from "../../../application/dto/GetMoviesDTO";

export interface FilterMoviesInterface {
    filter(movies: Movie[], getMoviesDTO: GetMoviesDTO): Promise<Movie[]>;
    setFilterStrategy(filterStrategy: MoviesFilterStrategyInterface): void;
}