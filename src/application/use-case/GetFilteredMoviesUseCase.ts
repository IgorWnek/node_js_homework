import { GetMoviesUseCaseInterface } from "./GetMoviesUseCaseInterface";
import { MovieRepositoryInterface } from "../repository/MovieRepositoryInterface";
import { MovieDTO } from "../dto/MovieDTO";
import { MoviesDTO } from "../dto/MoviesDTO";
import { Movie } from "../../domain/entity/Movie";

export class GetFilteredMoviesUseCase implements GetMoviesUseCaseInterface{
    movieRepository: MovieRepositoryInterface

    public constructor(movieRepository: MovieRepositoryInterface) {
        this.movieRepository = movieRepository;
    }

    async execute(): Promise<MoviesDTO> {
        let movies: Movie[] = await this.movieRepository.fetchAll();
        let moviesDTO = new MoviesDTO({
            movies: []
        });

        movies.forEach((movie: Movie) => {
            moviesDTO.movies.push(
                new MovieDTO({
                    id: movie.getId(),
                    genres: movie.getGenres(),
                    title: movie.getTitle(),
                    director: movie.getDirector(),
                    runtime: Number(movie.getRuntime()),
                    year: Number(movie.getYear()),
                    actors: movie.getActors(),
                    plot: movie.getPlot(),
                    posterUrl: movie.getPosterUrl()
                })
            )
        })

        return Promise.resolve(moviesDTO);
    }
}