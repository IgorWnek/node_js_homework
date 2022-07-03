import { Movie } from "../../domain/entity/Movie";
import { AddMovieDTO } from "../dto/AddMovieDTO";

export interface MoviesRepositoryInterface {
    fetchAll(): Promise<Array<Movie>>;
    findLastMovieId(): Promise<number>;
    save(addMovieDTO: AddMovieDTO): Promise<boolean>;
}