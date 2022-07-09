import { JsonDatabaseInterface } from "../../../../src/infrastructure/data-layer/data-source/database/JsonDatabaseInterface";
import { DataSourceInterface } from "../../../../src/infrastructure/data-layer/data-source/DataSourceInterface";
import { Movie } from "../../../../src/domain/entity/Movie";
import { AddMovieDTO } from "../../../../src/application/dto/AddMovieDTO";
import { MovieJSONDataSource } from "../../../../src/infrastructure/data-layer/data-source/MovieJSONDataSource";

describe("Movie JSON Data Source", () => {
    class MockJsonObjectDatabase implements JsonDatabaseInterface {
        private jsonObject: any;

        public constructor(jsonObject: any) {
            this.jsonObject = jsonObject;
        }

        async getJson(): Promise<any> {
            return Promise.resolve(this.jsonObject);
        }

        async saveJson(jsonObject: any): Promise<void> {
            this.jsonObject = jsonObject;
        }
    }

    let mockJsonDatabase: JsonDatabaseInterface;
    let movieJsonDataSource: DataSourceInterface<Movie, AddMovieDTO>;
    let moviesJsonSourceObject: any;

    beforeEach(() => {
        jest.clearAllMocks();
        moviesJsonSourceObject = { "movies": [{ "id": 1, "title": "Beetlejuice", "year": "1988", "runtime": "92", "director": "Tim Burton", "genres": ["Comedy", "Fantasy"], "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", "plot": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" }, { "id": 2, "title": "The Cotton Club", "year": "1984", "runtime": "127", "director": "Francis Ford Coppola", "genres": ["Crime", "Drama", "Music"], "actors": "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee", "plot": "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.", "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg" }] };

    })

    describe("fetchAll", () => {
        it("should return empty array for empty source json object", async () => {
            let emptyJsonObject = { "movies": [] };
            const expectedResult: [] = [];
            let mockEmptyJsonDatabase = new MockJsonObjectDatabase(emptyJsonObject);
            let mockEmptyJsonDataSource = new MovieJSONDataSource(mockEmptyJsonDatabase);
            const result = await mockEmptyJsonDataSource.fetchAll();

            expect(result).toStrictEqual(expectedResult);
        })
        it("should return movies entities from proper json object", async () => {
            mockJsonDatabase = new MockJsonObjectDatabase(moviesJsonSourceObject);
            movieJsonDataSource = new MovieJSONDataSource(mockJsonDatabase);
            const movie1 = new Movie({ id: 1, title: "Beetlejuice", year: 1988, runtime: 92, director: "Tim Burton", genres: ["Comedy", "Fantasy"], actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" });
            const movie2 = new Movie({ id: 2, title: "The Cotton Club", year: 1984, runtime: 127, director: "Francis Ford Coppola", genres: ["Crime", "Drama", "Music"], actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee", plot: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg" });
            const expectedMoviesEntities = [movie1, movie2];
            const result = await movieJsonDataSource.fetchAll();

            expect(result).toStrictEqual(expectedMoviesEntities);
        })
        it("should throw error on invalid source json object", async () => {
            let invalidMoviesJsonObject= {};
            let mockInvalidJsonDatabase = new MockJsonObjectDatabase(invalidMoviesJsonObject);
            let invalidMovieJsonDataSource = new MovieJSONDataSource(mockInvalidJsonDatabase);

            await expect(invalidMovieJsonDataSource.fetchAll()).rejects.toThrowError();
        })
    })

    describe("insert", () => {
        it("should add first movie to json database and return it's id = 1", async () => {
            let emptyJsonSourceObject = { "movies": [] };
            const addMovieDTO: AddMovieDTO = new AddMovieDTO({ title: "Beetlejuice", year: 1988, runtime: 92, director: "Tim Burton", genres: ["Comedy", "Fantasy"], actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" });
            const expectedMovieId: number = 1;
            const expectedJsonObjectAfterInsert: any = { movies: [{ "id": 1, "title": "Beetlejuice", "year": "1988", "runtime": "92", "director": "Tim Burton", "genres": ["Comedy", "Fantasy"], "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", "plot": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" }] };
            let mockEmptyJsonDatabase = new MockJsonObjectDatabase(emptyJsonSourceObject);
            let mockEmptyJsonDataSource = new MovieJSONDataSource(mockEmptyJsonDatabase);

            const resultMovieId: number = await mockEmptyJsonDataSource.insert(addMovieDTO);

            expect(resultMovieId).toStrictEqual(expectedMovieId);
            expect(await mockEmptyJsonDatabase.getJson()).toStrictEqual(expectedJsonObjectAfterInsert);
        })
        it("should add new movie to existing ones in json database and return it's calculated id", async () => {
            mockJsonDatabase = new MockJsonObjectDatabase(moviesJsonSourceObject);
            movieJsonDataSource = new MovieJSONDataSource(mockJsonDatabase);
            const addMovieDTO: AddMovieDTO = new AddMovieDTO({ title: "The Shawshank Redemption", year: 1994, runtime: 142, director: "Frank Darabont", genres: ["Crime", "Drama"], actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler", plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg" });
            const expectedMovieId: number = 3;
            const expectedJsonObjectAfterInsert: any = { movies: [{ "id": 1, "title": "Beetlejuice", "year": "1988", "runtime": "92", "director": "Tim Burton", "genres": ["Comedy", "Fantasy"], "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", "plot": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" }, { "id": 2, "title": "The Cotton Club", "year": "1984", "runtime": "127", "director": "Francis Ford Coppola", "genres": ["Crime", "Drama", "Music"], "actors": "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee", "plot": "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.", "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg" }, { "id": 3, "title": "The Shawshank Redemption", "year": "1994", "runtime": "142", "director": "Frank Darabont", "genres": ["Crime", "Drama"], "actors": "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler", "plot": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg" }] };

            const resultMovieId: number = await movieJsonDataSource.insert(addMovieDTO);

            expect(resultMovieId).toStrictEqual(expectedMovieId);
            expect(await mockJsonDatabase.getJson()).toStrictEqual(expectedJsonObjectAfterInsert);
        })
        it("should throw error on invalid source json object", async () => {
            let invalidMoviesJsonObject = {};
            let mockInvalidJsonDatabase = new MockJsonObjectDatabase(invalidMoviesJsonObject);
            let invalidMovieJsonDataSource = new MovieJSONDataSource(mockInvalidJsonDatabase);
            const addMovieDTO: AddMovieDTO = new AddMovieDTO({ title: "The Shawshank Redemption", year: 1994, runtime: 142, director: "Frank Darabont", genres: ["Crime", "Drama"], actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler", plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg" });

            await expect(invalidMovieJsonDataSource.insert(addMovieDTO)).rejects.toThrowError();
        })
    })
})