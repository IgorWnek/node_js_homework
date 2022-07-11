import { Movie } from "../../entity/Movie";
import {GetMoviesDTO} from "../../../application/dto/GetMoviesDTO";

export interface MoviesFilterStrategyInterface {
    filter(movies: Movie[], getMoviesDTO: GetMoviesDTO): Promise<Movie[]>;
}