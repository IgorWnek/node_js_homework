import { AddMovieDTO } from "../dto/AddMovieDTO";

export interface AddMovieUseCaseInterface {
    execute(addMovieDTO: AddMovieDTO): Promise<number>;
}