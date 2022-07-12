import { OrderMovies } from "../../../../../src/domain/order/movies/OrderMovies";
import { OrderMoviesInterface } from "../../../../../src/domain/order/movies/OrderMoviesInterface";
import { Movie } from "../../../../../src/domain/entity/Movie";
import { GetMoviesDTO } from "../../../../../src/application/dto/GetMoviesDTO";

describe("Order Movies", () => {
    let orderMovies: OrderMoviesInterface;
    let sourceMovies: Movie[];
    let getMoviesDTO: GetMoviesDTO;

    beforeEach(() => {
        orderMovies = new OrderMovies();
        sourceMovies = [
            new Movie({ id: 1, title: "Beetlejuice", year: 1988, runtime: 92, director: "Tim Burton", genres: ["Comedy", "Fantasy"], actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" }),
            new Movie({ id: 2, title: "The Cotton Club", year: 1984, runtime: 127, director: "Francis Ford Coppola", genres: ["Crime", "Drama", "Music"], actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee", plot: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg" }),
            new Movie({ id: 3, title: "The Shawshank Redemption", year: 1994, runtime: 142, director: "Frank Darabont", genres: ["Crime", "Drama"], actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler", plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg" }),
            new Movie({ id: 4, title: "Crocodile Dundee", year: 1986, runtime: 97, director: "Peter Faiman", genres: [], actors: "Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil", plot: "An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.", posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg" })
        ];
    })

    describe("order", () => {
        it("should return empty array on empty source movies array", async () => {
            let emptyMoviesSource: Movie[] = [];
            getMoviesDTO = new GetMoviesDTO({ genres: ["Crime", "Drama", "Music"]});
            const resultMovies: Movie[] = await orderMovies.order(emptyMoviesSource, getMoviesDTO);

            expect(resultMovies).toStrictEqual([]);
        });
        it("should throw an error if genre is not passed with GetMoviesDTO", async () => {
            getMoviesDTO = new GetMoviesDTO({});

            await expect(orderMovies.order(sourceMovies, getMoviesDTO))
                .rejects
                .toThrowError();
        });
        it("should return movies ordered by number of genres from GetMoviesDTO that match ones from a movie", async () => {
            getMoviesDTO = new GetMoviesDTO({ genres: ["Crime", "Drama", "Music"] });
            const resultMovies: Movie[] = await orderMovies.order(sourceMovies, getMoviesDTO);

            expect(resultMovies.length).toBe(4)
            expect(resultMovies[0].getId()).toBe(2);
            expect(resultMovies[1].getId()).toBe(3);
        })
    })
})