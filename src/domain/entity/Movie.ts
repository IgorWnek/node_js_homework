export interface CreateMoviePropertiesInterface {
    id: number;
    title: string;
    year: number;
    runtime: number;
    director: string;
    genres: string[];
    actors?: string;
    plot?: string;
    posterUrl?: string;
}

export class Movie {
    private id: number;
    private title: string;
    private year: string;
    private runtime: string;
    private director: string;
    private genres: string[];

    private actors?: string;
    private plot?: string;
    private posterUrl?: string;

    constructor(props: CreateMoviePropertiesInterface) {
        this.id = props.id;
        this.title = props.title;
        this.year = String(props.year);
        this.runtime = String(props.runtime);
        this.director = props.director;
        this.genres = props.genres;
        if (props.actors) {
            this.actors = props.actors;
        }
        if (props.plot) {
            this.plot = props.plot;
        }
        if (props.posterUrl) {
            this.posterUrl = props.posterUrl;
        }
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getYear(): string {
        return this.year;
    }

    public getRuntime(): string {
        return this.runtime;
    }

    public getDirector(): string {
        return this.director;
    }

    public getGenres(): string[] {
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
}