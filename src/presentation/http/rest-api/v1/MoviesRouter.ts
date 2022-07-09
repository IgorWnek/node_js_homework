import express from 'express';
import { Request, Response } from 'express';
import { checkSchema, validationResult, Schema} from "express-validator";
import { AddMovieUseCaseInterface } from "../../../../application/use-case/AddMovieUseCaseInterface";
import { AddMovieDTO } from "../../../../application/dto/AddMovieDTO";
import { createMovieValidationSchema } from "../../../validation/GetMoviesSchemaValidation";


export default function MoviesRouter (
    addMovieUseCase: AddMovieUseCaseInterface
) {
    const router = express.Router()

    router.post(
        '/movies',
        checkSchema(createMovieValidationSchema),
        async (req: Request, res: Response) => {
            try {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() })
                }

                const addMovieDTO = new AddMovieDTO(req.body);
                const createdMovieId = await addMovieUseCase.execute(addMovieDTO);
                res.statusCode = 201
                res.json(
                    {
                        message: "Created",
                        movieId: createdMovieId
                    }
                )
            } catch (e: any) {
                res.status(500).send({ message: 'Error while saving data' })
            }
        }
    )

    return router
}