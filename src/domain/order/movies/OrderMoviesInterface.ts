import { Movie } from "../../entity/Movie";
import { GetMoviesDTO } from "../../../application/dto/GetMoviesDTO";

export interface OrderMoviesInterface {
    order(movies: Movie[], getMoviesDTO: GetMoviesDTO): Promise<Movie[]>;
}