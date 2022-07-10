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

export const getMoviesValidationSchema: Schema = {
    duration: {
        in: ['query'],
        optional: true,
        isInt: { errorMessage: 'Runtime field must be an integer' }
    },
    genres: {
        in: ['query'],
        optional: true,
        isArray: { errorMessage: 'Genres field must be an array' },
        isIn: { options: availableGenres,
            errorMessage: 'Genre must be one of the available genres: ' + availableGenres.join(', ')
        }
    }
}