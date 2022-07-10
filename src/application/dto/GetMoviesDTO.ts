export interface GetMoviesDTOPropsInterface {
    duration?: number;
    genres?: string[];
}

export class GetMoviesDTO {
    public duration?: number;
    public genres?: string[];

    public constructor(props: GetMoviesDTOPropsInterface) {
        if (props.duration) {
            this.duration = props.duration;
        }
        if (props.genres) {
            this.genres = props.genres;
        }
    }
}