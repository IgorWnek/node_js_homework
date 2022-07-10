import {Schema} from "express-validator";

// TODO Add custom validation for genres to validate against those from DB
export const addMovieValidationSchema: Schema = {
    title: {
        in: ['body'],
        exists: { errorMessage: 'Title is required field' },
        isString: { errorMessage: 'Title field must be a string value' },
        isLength: { options: { max: 255 }, errorMessage: 'Title field can have max 255 signs length' }
    },
    year: {
        in: ['body'],
        exists: { errorMessage: 'Year is required field' },
        isInt: { errorMessage: 'Year field must be an integer value' }
    },
    runtime: {
        in: ['body'],
        exists: { errorMessage: 'Runtime is required field' },
        isInt: { errorMessage: 'Runtime field must be an integer value' }
    },
    director: {
        in: ['body'],
        exists: { errorMessage: 'Director is required field' },
        isString: { errorMessage: 'Director field must be a string value' },
        isLength: { options: { max: 255 }, errorMessage: 'Director field can have max 255 signs length'}
    },
    genres: {
        in: ['body'],
        exists: { errorMessage: 'Genres is required field' },
        isArray: { options: { min: 1 }, errorMessage: 'At least one genre must be specified' },
        isIn: { options: [
            "Comedy",
            "Fantasy",
            "Crime",
            "Drama",
            "Music",
            "Adventure",
            "History",
            "Thriller",
            "Animation",
            "Family",
            "Mystery",
            "Biography",
            "Action",
            "Film-Noir",
            "Romance",
            "Sci-Fi",
            "War",
            "Western",
            "Horror",
            "Musical",
            "Sport"
        ] }
    },
    actors: {
        in: ['body'],
        isString: { errorMessage: 'Actors field must be a string value' },
        optional: true
    },
    plot: {
        in: ['body'],
        isString: { errorMessage: 'Plot field must be a string value' },
        optional: true
    },
    posterUrl: {
        in: ['body'],
        isString: { errorMessage: 'Poster URL field must be a string value' },
        optional: true
    }
}