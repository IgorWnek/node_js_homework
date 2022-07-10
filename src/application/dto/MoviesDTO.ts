import { MovieDTO } from "./MovieDTO";

export interface MoviesDTOPropsInterface {
    movies: MovieDTO[];
}

export class MoviesDTO {
    public movies: MovieDTO[];

    public constructor(props: MoviesDTOPropsInterface) {
        this.movies = props.movies;
    }
}