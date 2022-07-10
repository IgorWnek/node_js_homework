import { MoviesDTO } from "../dto/MoviesDTO";
import { GetMoviesDTO } from "../dto/GetMoviesDTO";

export interface GetMoviesUseCaseInterface {
    execute(getMoviesDTO: GetMoviesDTO): Promise<MoviesDTO>;
}