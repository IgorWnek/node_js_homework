import { MovieRepositoryInterface } from "../../../../src/application/repository/MovieRepositoryInterface";
import { Movie } from "../../../../src/domain/entity/Movie";
import {MovieDTO} from "../../../../src/application/dto/MovieDTO";
import { MoviesDTO } from "../../../../src/application/dto/MoviesDTO";
import { GetFilteredMoviesUseCase } from "../../../../src/application/use-case/GetFilteredMoviesUseCase";

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

    beforeEach(() => {
        jest.clearAllMocks();
        mockMovieRepository = new MockMovieRepository();
    })

    it('should return MoviesDTO instance from existing Movie[] array', async () => {
        const moviesSource = [
            new Movie({ id: 1, title: "Beetlejuice", year: 1988, runtime: 92, director: "Tim Burton", genres: ["Comedy", "Fantasy"], actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" }),
            new Movie({ id: 2, title: "The Shawshank Redemption", year: 1994, runtime: 142, director: "Frank Darabont", genres: ["Crime", "Drama"], actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler", plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg" })
        ];
        const expectedMoviesDTO = new MoviesDTO({
            movies: [
                new MovieDTO({ id: 1, title: "Beetlejuice", year: 1988, runtime: 92, director: "Tim Burton", genres: ["Comedy", "Fantasy"], actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" }),
                new MovieDTO({ id: 2, title: "The Shawshank Redemption", year: 1994, runtime: 142, director: "Frank Darabont", genres: ["Crime", "Drama"], actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler", plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg" })
            ]
        });

        jest.spyOn(mockMovieRepository, "fetchAll")
            .mockImplementation(() => Promise.resolve(moviesSource));
        const getMoviesUseCase = new GetFilteredMoviesUseCase(mockMovieRepository);
        const result = await getMoviesUseCase.execute();

        expect(result).toStrictEqual(expectedMoviesDTO);
    })
    it('should return MoviesDTO instance with empty movies array from empty Movie[] array', async () => {
        const moviesSource: Movie[] = [];
        const expectedMoviesDTO = new MoviesDTO({ movies: [] });

        jest.spyOn(mockMovieRepository, "fetchAll")
            .mockImplementation(() => Promise.resolve(moviesSource));
        const getMoviesUseCase = new GetFilteredMoviesUseCase(mockMovieRepository);
        const result = await getMoviesUseCase.execute();

        expect(result).toStrictEqual(expectedMoviesDTO);
    })
})