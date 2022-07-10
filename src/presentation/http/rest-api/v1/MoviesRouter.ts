import express from 'express';
import { Request, Response } from 'express';
import { checkSchema, validationResult, Schema} from "express-validator";
import { AddMovieUseCaseInterface } from "../../../../application/use-case/AddMovieUseCaseInterface";
import { GetMoviesUseCaseInterface } from "../../../../application/use-case/GetMoviesUseCaseInterface";
import { AddMovieDTO } from "../../../../application/dto/AddMovieDTO";
import { addMovieValidationSchema } from "../../../validation/AddMovieSchemaValidation";
import { getMoviesValidationSchema } from "../../../validation/GetMoviesSchemaValidation";
import { MoviesDTO } from "../../../../application/dto/MoviesDTO";
import { instanceToPlain } from "class-transformer";

export default function MoviesRouter (
    addMovieUseCase: AddMovieUseCaseInterface,
    getMoviesUseCase: GetMoviesUseCaseInterface
) {
    const router = express.Router()

    router.post(
        '/movies',
        checkSchema(addMovieValidationSchema),
        async (req: Request, res: Response) => {
            try {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }

                const addMovieDTO = new AddMovieDTO(req.body);
                const createdMovieId = await addMovieUseCase.execute(addMovieDTO);

                return res.status(201)
                    .json({
                        message: "Created",
                        movieId: createdMovieId
                    });
            } catch (e: any) {
                res.status(500).send({ message: 'Error while saving data' })
            }
        }
    )

    router.get(
        '/movies',
        checkSchema(getMoviesValidationSchema),
        async (req: Request, res: Response) => {
            try {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(404)
                        .json({ errors: errors.array() });
                }

                let movies: MoviesDTO = await getMoviesUseCase.execute();

                if (!movies) {
                    return res.status(204);
                }

                return res.status(200)
                    .json(instanceToPlain(movies));
            } catch (e: any) {
                return res.status(500).send({ message: 'Error while getting movies' })
            }
        }
    )

    return router
}