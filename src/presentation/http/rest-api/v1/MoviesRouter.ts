import express from 'express';
import { Request, Response } from 'express';
import {AddMovieUseCaseInterface} from "../../../../application/use-case/AddMovieUseCaseInterface";

export default function MoviesRouter (
    addMovieUseCase: AddMovieUseCaseInterface
) {
    const router = express.Router()

    router.post('/', async (req: Request, res: Response) => {
        try {
            await addMovieUseCase.execute(req.body)
            res.statusCode = 201
            res.json({ message: "Created" })
        } catch (err) {
            res.status(500).send({ message: "Error while saving data" })
        }
    })

    return router
}