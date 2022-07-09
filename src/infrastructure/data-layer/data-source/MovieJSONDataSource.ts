import { DataSourceInterface } from "./DataSourceInterface";
import { Movie } from "../../../domain/entity/Movie";
import { AddMovieDTO } from "../../../application/dto/AddMovieDTO";
import { JsonDatabaseInterface } from "./database/JsonDatabaseInterface";
import { instanceToPlain } from "class-transformer";

export class MovieJSONDataSource implements DataSourceInterface<Movie, AddMovieDTO> {
    private readonly jsonDatabase: JsonDatabaseInterface;

    constructor(jsonDatabase: JsonDatabaseInterface) {
        this.jsonDatabase = jsonDatabase;
    }

    public async fetchAll(): Promise<Array<Movie>> {
        try {
            const moviesJson = await this.jsonDatabase.getJson();
            let moviesList: Movie[] = [];
            moviesJson.movies.forEach((movie: any) => {
                moviesList.push(new Movie({
                    id: movie.id,
                    title: movie.title,
                    year: Number(movie.year),
                    runtime: Number(movie.runtime),
                    director: movie.director,
                    genres: movie.genres,
                    actors: movie.actors,
                    plot: movie.plot,
                    posterUrl: movie.posterUrl
                }));
            });

            return Promise.resolve(moviesList);
        } catch (e:any) {
            throw new Error(
                `Error occurred while trying to fetch all movies from json database. Error msg: ${e.message}`
            );
        }
    }

    public async insert(addMovieDTO: AddMovieDTO): Promise<number> {
        try {
            let moviesJson = await this.jsonDatabase.getJson();
            let newId = MovieJSONDataSource.getNewMovieId(moviesJson.movies);
            let movieEntity: Movie = new Movie({
                id: newId,
                title: addMovieDTO.title,
                year: addMovieDTO.year,
                runtime: addMovieDTO.runtime,
                director: addMovieDTO.director,
                genres: addMovieDTO.genres,
                actors: addMovieDTO.actors,
                plot: addMovieDTO.plot,
                posterUrl: addMovieDTO.posterUrl
            });
            moviesJson.movies.push(instanceToPlain(movieEntity));
            await this.jsonDatabase.saveJson(moviesJson);

            return Promise.resolve(newId);
        } catch (e:any) {
            throw new Error(
                `Error occurred while inserting "${addMovieDTO.title}" into json database. Error msg: ${e.message}`
            );
        }
    }

    private static getNewMovieId(movies: []): number {
        if (!movies.length) {
            return 1;
        }
        let lastMovie:any = movies[movies.length - 1];

        return lastMovie.id + 1;
    }
}