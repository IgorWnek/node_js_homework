export interface AddMovieDTOPropsInterface {
    title: string;
    year: number;
    runtime: number;
    director: string;
    genres: string[];
    actors?: string;
    plot?: string;
    posterUrl?: string;
}

export class AddMovieDTO {
    public title: string;
    public year: number;
    public runtime: number;
    public director: string;
    public genres: string[];
    public actors?: string;
    public plot?: string;
    public posterUrl?: string;

    constructor(props: AddMovieDTOPropsInterface) {
        this.title = props.title;
        this.year = props.year;
        this.runtime = props.runtime;
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
}