import { MoviesRepositoryInterface } from "../../../application/repository/MoviesRepositoryInterface";
import { Movie } from "../../../domain/entity/Movie";
import fs from "fs";
import { AddMovieDTO } from "../../../application/dto/AddMovieDTO";
import { instanceToPlain } from "class-transformer";

export default class MoviesJSONRepository implements MoviesRepositoryInterface {
    private readonly filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    async fetchAll(): Promise<Array<Movie>> {
        const moviesFileBuffer = await fs.promises.readFile(this.filePath);
        const parsedMoviesJson = JSON.parse(moviesFileBuffer.toString());
        // const parsedMoviesJson = this.getFileJson(); TODO fix TS error to uncomment here
        let moviesList: Array<Movie> = [];

        parsedMoviesJson.movies.forEach( (movie: Movie) => {
            moviesList.push(movie);
        });

        return moviesList;
    }

    async findLastMovieId(): Promise<number> {
        let parsedMoviesJson = await this.getFileJson();
        const lastMovieId: number = parsedMoviesJson.movies[parsedMoviesJson.movies.length - 1].id;
        // TODO handle errors

        return lastMovieId;
    }

    async save(addMovieDTO: AddMovieDTO): Promise<boolean> {
        let parsedMoviesJson = await this.getFileJson();
        parsedMoviesJson.movies.push(instanceToPlain(addMovieDTO));
        const updatedMoviesBuffer = JSON.stringify(parsedMoviesJson);
        await fs.promises.writeFile(this.filePath, updatedMoviesBuffer);

        return true;
    }

    private async getFileJson(): Promise<any> {
        const moviesFileBuffer = await fs.promises.readFile(this.filePath);
        // TODO Add typing for the "whole" json object to easily fetch types
        // TODO Catch errors
        // TODO Consider to move json file operations to separate class

        return JSON.parse(moviesFileBuffer.toString());
    }
}