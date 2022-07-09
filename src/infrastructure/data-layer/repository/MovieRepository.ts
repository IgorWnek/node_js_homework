import { MovieRepositoryInterface } from "../../../application/repository/MovieRepositoryInterface";
import { Movie } from "../../../domain/entity/Movie";
import { AddMovieDTO } from "../../../application/dto/AddMovieDTO";
import { DataSourceInterface } from "../data-source/DataSourceInterface";

export default class MovieRepository implements MovieRepositoryInterface {
    private dataSource: DataSourceInterface<Movie, AddMovieDTO>;

    constructor(dataSource: DataSourceInterface<Movie, AddMovieDTO>) {
        this.dataSource = dataSource;
    }

    async fetchAll(): Promise<Array<Movie>> {
        return this.dataSource.fetchAll();
    }

    async save(addMovieDTO: AddMovieDTO): Promise<number> {
        return this.dataSource.insert(addMovieDTO);
    }
}