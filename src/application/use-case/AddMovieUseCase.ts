import {AddMovieUseCaseInterface} from "./AddMovieUseCaseInterface";
import {MovieRepositoryInterface} from "../repository/MovieRepositoryInterface";
import {AddMovieDTO} from "../dto/AddMovieDTO";

export class AddMovieUseCase implements AddMovieUseCaseInterface {
    movieRepository: MovieRepositoryInterface

    constructor(movieRepository: MovieRepositoryInterface) {
        this.movieRepository = movieRepository
    }

    async execute(addMovieDTO: AddMovieDTO): Promise<boolean> {
        return await this.movieRepository.save(addMovieDTO);
    }
}