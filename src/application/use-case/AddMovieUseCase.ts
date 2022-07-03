import {AddMovieUseCaseInterface} from "./AddMovieUseCaseInterface";
import {MoviesRepositoryInterface} from "../repository/MoviesRepositoryInterface";
import {AddMovieDTO} from "../dto/AddMovieDTO";

export class AddMovieUseCase implements AddMovieUseCaseInterface {
    movieRepository: MoviesRepositoryInterface

    constructor(movieRepository: MoviesRepositoryInterface) {
        this.movieRepository = movieRepository
    }

    async execute(addMovieDTO: AddMovieDTO): Promise<boolean> {
        return await this.movieRepository.save(addMovieDTO);
    }
}