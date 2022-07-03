import {Genre} from "./Genre";

export interface CreateMoviePropertiesInterface {
    id: number;
    title: string;
    year: number;
    runtime: number;
    director: string;
    genres: Array<Genre>;
}

export class Movie {
    private id: number;
    private title: string;
    private year: number;
    private runtime: number;
    private director: string;
    private genres: Array<Genre>;

    private actors?: string;
    private plot?: string;
    private posterUrl?: string;

    constructor({id, title, year, runtime, director, genres}: CreateMoviePropertiesInterface) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.director = director;
        this.genres = genres;
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getYear(): number {
        return this.year;
    }

    public getRuntime(): number {
        return this.runtime;
    }

    public getDirector(): string {
        return this.director;
    }

    public getGenres(): Array<Genre> {
        return this.genres;
    }

    public getActors(): string | undefined {
        return this.actors;
    }

    public getPlot(): string | undefined {
        return this.plot;
    }

    public getPosterUrl(): string | undefined {
        return this.posterUrl;
    }

    // TODO put methods for the logic from part 2. of the task
}