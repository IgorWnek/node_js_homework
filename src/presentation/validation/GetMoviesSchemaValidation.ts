import {Schema} from "express-validator";

const availableGenres = [
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
];

// TODO Add custom validation for genres to validate against those from DB
export const getMoviesValidationSchema: Schema = {
    duration: {
        in: ['query'],
        optional: true,
        isInt: { errorMessage: 'Runtime field must be an integer' }
    },
    genres: {
        in: ['query'],
        optional: true,
        isArray: {
            bail: true,
            options: {
                min: 1
            },
            errorMessage: 'Genres field must be an array' },
        custom: {
            options: (genres) => {
                for (const genre of genres) {
                    if (!availableGenres.includes(genre)) {
                        return false;
                    }
                }
                return true;
            },
            errorMessage: 'Genre must be one of the available genres: ' + availableGenres.join(', ')
        },
    }
}