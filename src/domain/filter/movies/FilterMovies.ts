import {MoviesFilterStrategyInterface} from "./MoviesFilterStrategyInterface";
import {Movie} from "../../entity/Movie";
import {FilterMoviesInterface} from "./FilterMoviesInterface";
import {GetMoviesDTO} from "../../../application/dto/GetMoviesDTO";

export class FilterMovies implements FilterMoviesInterface {
    private filterStrategy?: MoviesFilterStrategyInterface;

    public async filter(movies: Movie[], getMoviesDTO: GetMoviesDTO): Promise<Movie[]> {
        if (!this.filterStrategy) {
            throw new Error("Filter strategy property is not set in FilterMovies class");
        }

        return await this.filterStrategy.filter(movies, getMoviesDTO);
    }

    setFilterStrategy(filterStrategy: MoviesFilterStrategyInterface): void {
        this.filterStrategy = filterStrategy;
    }
}