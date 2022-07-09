import {DataSourceInterface} from "../../../../src/infrastructure/data-layer/data-source/DataSourceInterface";
import {Movie} from "../../../../src/domain/entity/Movie";
import {AddMovieDTO} from "../../../../src/application/dto/AddMovieDTO";
import {MovieRepositoryInterface} from "../../../../src/application/repository/MovieRepositoryInterface";
import MovieRepository from "../../../../src/infrastructure/data-layer/repository/MovieRepository";

describe("Movie Repository", () => {
    class MockMovieDataSource implements DataSourceInterface<Movie, AddMovieDTO> {
        fetchAll(): Promise<Movie[]> {
            throw new Error("Method not implemented.");
        }

        insert(addDTOType: AddMovieDTO): Promise<number> {
            throw new Error("Method not implemented");
        }
    }

    let mockMovieDataSource: DataSourceInterface<Movie, AddMovieDTO>;
    let movieRepository: MovieRepositoryInterface;

    beforeEach(() => {
        jest.clearAllMocks();
        mockMovieDataSource = new MockMovieDataSource();
        movieRepository = new MovieRepository(mockMovieDataSource);
    })

    describe("fetchAll", () => {
        it("should return movies entities", async () => {
            const movie1 = new Movie({ id: 1, title: "Beetlejuice", year: 1988, runtime: 92, director: "Tim Burton", genres: ["Comedy", "Fantasy"], actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" });
            const movie2 = new Movie({ id: 2, title: "The Cotton Club", year: 1984, runtime: 127, director: "Francis Ford Coppola", genres: ["Crime", "Drama", "Music"], actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee", plot: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg" });
            const expectedMoviesEntities = [movie1, movie2];
            jest.spyOn(mockMovieDataSource, "fetchAll")
                .mockImplementation(() => Promise.resolve(expectedMoviesEntities));
            const result = await movieRepository.fetchAll();

            expect(result).toBe(expectedMoviesEntities);
        })
    })

    describe("save", () => {
        it("should return newly inserted movie's id", async () => {
            const addMovieDTO: AddMovieDTO = { title: "Beetlejuice", year: 1988, runtime: 92, director: "Tim Burton", genres: ["Comedy", "Fantasy"], actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" };
            const expectedNewMovieId: number = 1;
            jest.spyOn(mockMovieDataSource, "insert")
                .mockImplementation(() => Promise.resolve(expectedNewMovieId));
            const result = await movieRepository.save(addMovieDTO);

            expect(result).toBe(expectedNewMovieId);
        })
    })
})