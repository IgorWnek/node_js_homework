import express from 'express';
import { Request, Response } from 'express';
import { checkSchema, validationResult} from "express-validator";
import { AddMovieUseCaseInterface } from "../../../../application/use-case/AddMovieUseCaseInterface";
import { AddMovieDTO } from "../../../../application/dto/AddMovieDTO";

export default function MoviesRouter (
    addMovieUseCase: AddMovieUseCaseInterface
) {
    const router = express.Router()

    router.post(
        '/movies',
        checkSchema({
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
        }),
        async (req: Request, res: Response) => {
            try {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() })
                }

                const addMovieDTO = new AddMovieDTO(req.body);
                await addMovieUseCase.execute(addMovieDTO)
                res.statusCode = 201
                res.json({ message: "Created" })
            } catch (err: any) {
                res.status(500).send({ message: 'Error while saving data' })
            }
        }
    )

    return router
}