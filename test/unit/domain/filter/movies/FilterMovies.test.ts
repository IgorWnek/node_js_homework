import {MoviesFilterStrategyInterface} from "../../../../../src/domain/filter/movies/MoviesFilterStrategyInterface";
import {RandomMoviesFilter} from "../../../../../src/domain/filter/movies/RandomMoviesFilter";
import {FilterMovies} from "../../../../../src/domain/filter/movies/FilterMovies";
import {Movie} from "../../../../../src/domain/entity/Movie";

describe("Filter Movies", () => {
    let filterMovieStrategy: MoviesFilterStrategyInterface;
    let filterMovies: FilterMovies;
    let sourceMovies: Movie[];

    beforeEach(() => {
        jest.clearAllMocks();
        sourceMovies = [
            new Movie({ id: 1, title: "Beetlejuice", year: 1988, runtime: 92, director: "Tim Burton", genres: ["Comedy", "Fantasy"], actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" }),
            new Movie({ id: 2, title: "The Cotton Club", year: 1984, runtime: 127, director: "Francis Ford Coppola", genres: ["Crime", "Drama", "Music"], actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee", plot: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg" }),
            new Movie({ id: 3, title: "The Shawshank Redemption", year: 1994, runtime: 142, director: "Frank Darabont", genres: ["Crime", "Drama"], actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler", plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg" })
        ];
        filterMovies = new FilterMovies();
    })

    describe("filter", () => {
        it("should throw an error if filter strategy is not set first", async () => {
            await expect(filterMovies.filter(sourceMovies)).rejects.toThrowError();
        });
        describe("with random movie filter strategy", () => {
            it("should return array with random Movie entity", async () => {
                filterMovieStrategy = new RandomMoviesFilter();
                filterMovies.setFilterStrategy(filterMovieStrategy);
                const resultMovies = await filterMovies.filter(sourceMovies);
                const resultMovie = resultMovies[0];

                expect(resultMovies.length).toBe(1);
                expect(resultMovie).toBeInstanceOf(Movie);
            });
        })
    })
})