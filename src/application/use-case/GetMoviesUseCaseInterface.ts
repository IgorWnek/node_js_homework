import {MoviesDTO} from "../dto/MoviesDTO";

export interface GetMoviesUseCaseInterface {
    execute(): Promise<MoviesDTO>;
}