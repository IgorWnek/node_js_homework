import {MovieRepositoryInterface} from "../../../../src/application/repository/MovieRepositoryInterface";
import {Movie} from "../../../../src/domain/entity/Movie";
import {AddMovieDTO} from "../../../../src/application/dto/AddMovieDTO";
import {AddMovieUseCase} from "../../../../src/application/use-case/AddMovieUseCase";

describe("Add Movie Use Case", () => {
    class MockMovieRepository implements MovieRepositoryInterface {
        fetchAll(): Promise<Array<Movie>> {
            throw new Error("Method not implemented");
        }

        save(addMovieDTO: AddMovieDTO): Promise<number> {
            throw new Error("Method not implemented.");
        }

    }
    let mockMovieRepository: MockMovieRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockMovieRepository = new MockMovieRepository();
    })

    it("should return newly added movie's id", async () => {
        const expectedNewMovieId: number = 1;
        const addMovieDTO: AddMovieDTO = new AddMovieDTO({ title: "Beetlejuice", year: 1988, runtime: 92, director: "Tim Burton", genres: ["Comedy", "Fantasy"], actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" });

        jest.spyOn(mockMovieRepository, "save")
            .mockImplementation(() => Promise.resolve(expectedNewMovieId));
        const addMovieUseCase = new AddMovieUseCase(mockMovieRepository);
        const result = await addMovieUseCase.execute(addMovieDTO);

        expect(result).toStrictEqual(expectedNewMovieId);
    })
})