import { GetMoviesUseCaseInterface } from "./GetMoviesUseCaseInterface";
import { MovieRepositoryInterface } from "../repository/MovieRepositoryInterface";
import { MovieDTO } from "../dto/MovieDTO";
import { MoviesDTO } from "../dto/MoviesDTO";
import { Movie } from "../../domain/entity/Movie";
import { GetMoviesDTO } from "../dto/GetMoviesDTO";
import {FilterMoviesInterface} from "../../domain/filter/movies/FilterMoviesInterface";
import {RandomMoviesFilter} from "../../domain/filter/movies/RandomMoviesFilter";

export class GetFilteredMoviesUseCase implements GetMoviesUseCaseInterface{
    movieRepository: MovieRepositoryInterface;
    filterMovies: FilterMoviesInterface;

    public constructor(movieRepository: MovieRepositoryInterface, filterMovies: FilterMoviesInterface ) {
        this.movieRepository = movieRepository;
        this.filterMovies = filterMovies;
    }

    async execute(getMoviesDTO: GetMoviesDTO): Promise<MoviesDTO> {
        let movies: Movie[] = await this.movieRepository.fetchAll();
        let moviesDTO = new MoviesDTO({
            movies: []
        });

        if (!movies.length) {
            return Promise.resolve(moviesDTO);
        }

        if (!getMoviesDTO.genres && !getMoviesDTO.duration) {
            await this.filterMovies.setFilterStrategy(new RandomMoviesFilter());
            movies = await this.filterMovies.filter(movies);
        }

        await Promise.all(movies.map(async (movie: Movie) => {
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
        }));

        return Promise.resolve(moviesDTO);
    }
}