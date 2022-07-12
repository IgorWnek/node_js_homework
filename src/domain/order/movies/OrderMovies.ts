import { OrderMoviesInterface } from "./OrderMoviesInterface";
import { Movie } from "../../entity/Movie";
import { GetMoviesDTO } from "../../../application/dto/GetMoviesDTO";
import {SortByGenresMovieDTO} from "../../../application/dto/SortByGenresMovieDTO";

export class OrderMovies implements OrderMoviesInterface {
    async order(movies: Movie[], getMoviesDTO: GetMoviesDTO): Promise<Movie[]> {
        if (
            !getMoviesDTO.genres
            || (getMoviesDTO.genres && !getMoviesDTO.genres.length)
        ) {
            throw new Error('Order movies require genres parameter to be passed by GetMoviesDTO');
        }

        let sortByGenresMovieDTOs = await this.prepareSortData(movies, getMoviesDTO.genres);
        sortByGenresMovieDTOs.sort(
            (a, b) => 0 - (a.matchingGenres > b.matchingGenres ? 1 : -1)
        );

        let orderedMovies: Movie[] = [];

        for (let sortMovieDTO of sortByGenresMovieDTOs) {
            orderedMovies.push(sortMovieDTO.movie);
        }

        return Promise.resolve(orderedMovies);
    }

    private async prepareSortData(movies: Movie[], genresToCheck: string[]): Promise<SortByGenresMovieDTO[]> {
        let sortMovies: SortByGenresMovieDTO[] = [];

        for (let movie of movies) {
            let sortMovieDTO = new SortByGenresMovieDTO(movie);

            for (let movieGenre of movie.getGenres()) {
                if (genresToCheck.includes(movieGenre)) {
                    sortMovieDTO.matchingGenres += 1;
                }
            }
            sortMovies.push(sortMovieDTO);
        }

        return Promise.resolve(sortMovies);
    }
}