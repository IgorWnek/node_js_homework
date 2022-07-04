import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import helmet from 'helmet';
import dotenv from 'dotenv';
import MoviesRouter from "./presentation/http/rest-api/v1/MoviesRouter";
import {AddMovieUseCase} from "./application/use-case/AddMovieUseCase";
import MoviesJSONRepository from "./infrastructure/repository/file/MovieRepository";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DB_FILE_PATH = process.env.DB_FILE_PATH || __dirname + '/../data/db.json';
const moviesRouter = MoviesRouter(
    new AddMovieUseCase(new MoviesJSONRepository(DB_FILE_PATH))
);

app.use('', moviesRouter);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));