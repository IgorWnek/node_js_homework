import {MoviesFilterStrategyInterface} from "./MoviesFilterStrategyInterface";
import {Movie} from "../../entity/Movie";

export class RandomMoviesFilter implements MoviesFilterStrategyInterface {
    public async filter(movies: Movie[]): Promise<Movie[]> {
        const movieKey = Math.floor(Math.random() * movies.length);

        return Promise.resolve([movies[movieKey]]);
    }
}