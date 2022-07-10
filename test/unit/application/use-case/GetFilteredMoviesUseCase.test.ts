import { MovieRepositoryInterface } from "../../../../src/application/repository/MovieRepositoryInterface";
import { Movie } from "../../../../src/domain/entity/Movie";
import {MovieDTO} from "../../../../src/application/dto/MovieDTO";
import { MoviesDTO } from "../../../../src/application/dto/MoviesDTO";
import { GetFilteredMoviesUseCase } from "../../../../src/application/use-case/GetFilteredMoviesUseCase";
import {FilterMoviesInterface} from "../../../../src/domain/filter/movies/FilterMoviesInterface";
import {FilterMovies} from "../../../../src/domain/filter/movies/FilterMovies";
import {GetMoviesUseCaseInterface} from "../../../../src/application/use-case/GetMoviesUseCaseInterface";
import {GetMoviesDTO} from "../../../../src/application/dto/GetMoviesDTO";

describe("Get Filtered Movies Use Case", () => {
    class MockMovieRepository implements MovieRepositoryInterface {
        fetchAll(): Promise<Array<Movie>> {
            throw new Error("Method not implemented");
        }

        save(addMovieDTO: MovieDTO): Promise<number> {
            throw new Error("Method not implemented");
        }
    }
    let mockMovieRepository: MockMovieRepository;
    let sourceMovies: Movie[];
    let filterMovies: FilterMoviesInterface;
    let getMoviesUseCase: GetMoviesUseCaseInterface;
    let getMoviesDTO: GetMoviesDTO;

    beforeEach(() => {
        jest.clearAllMocks();
        mockMovieRepository = new MockMovieRepository();
        filterMovies = new FilterMovies();
        getMoviesUseCase = new GetFilteredMoviesUseCase(mockMovieRepository, filterMovies);
        sourceMovies = [
            new Movie({ id: 1, title: "Beetlejuice", year: 1988, runtime: 92, director: "Tim Burton", genres: ["Comedy", "Fantasy"], actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" }),
            new Movie({ id: 2, title: "The Cotton Club", year: 1984, runtime: 127, director: "Francis Ford Coppola", genres: ["Crime", "Drama", "Music"], actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee", plot: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg" }),
            new Movie({ id: 3, title: "The Shawshank Redemption", year: 1994, runtime: 142, director: "Frank Darabont", genres: ["Crime", "Drama"], actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler", plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg" })
        ];
    })

    it('should return MoviesDTO instance with empty movies array from empty Movie[] array', async () => {
        const emptyMoviesSource: Movie[] = [];
        const expectedEmptyMoviesDTO = new MoviesDTO({ movies: [] });

        jest.spyOn(mockMovieRepository, "fetchAll")
            .mockImplementation(() => Promise.resolve(emptyMoviesSource));
        getMoviesDTO = new GetMoviesDTO({});
        const result = await getMoviesUseCase.execute(getMoviesDTO);

        expect(result).toStrictEqual(expectedEmptyMoviesDTO);
    })

    describe("execute with GetMoviesDTO without parameters", () => {
        it ("should return array with random Movie entity", async () => {
            jest.spyOn(mockMovieRepository, "fetchAll")
                .mockImplementation(() => Promise.resolve(sourceMovies));
            getMoviesDTO = new GetMoviesDTO({});
            const resultMoviesDTO = await getMoviesUseCase.execute(getMoviesDTO);

            expect(resultMoviesDTO.movies.length).toBe(1);
            expect(resultMoviesDTO.movies[0]).toBeInstanceOf(MovieDTO);
        })
    })
})