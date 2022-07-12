import { Movie } from "../../domain/entity/Movie";

export class SortByGenresMovieDTO {
    public movie: Movie;
    public matchingGenres: number;

    public constructor(movie: Movie) {
        this.movie = movie;
        this.matchingGenres = 0;
    }
}