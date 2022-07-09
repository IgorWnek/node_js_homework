import { Movie } from "../../domain/entity/Movie";
import { AddMovieDTO } from "../dto/AddMovieDTO";

export interface MovieRepositoryInterface {
    fetchAll(): Promise<Array<Movie>>;
    save(addMovieDTO: AddMovieDTO): Promise<number>;
}