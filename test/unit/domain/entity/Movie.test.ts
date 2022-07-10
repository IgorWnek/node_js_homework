import {Movie} from "../../../../src/domain/entity/Movie";

describe("Movie", () => {
    it('should create movie from constructor props with all properties', () => {
        const movie = new Movie({
            id: 1,
            title: "Beetlejuice",
            year: 1988,
            runtime: 92,
            director: "Tim Burton",
            genres: ["Comedy", "Fantasy"],
            actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
            plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.",
            posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg"
        });
        expect(movie.getId()).toStrictEqual(1);
        expect(movie.getTitle()).toStrictEqual("Beetlejuice");
        expect(movie.getYear()).toStrictEqual("1988");
        expect(movie.getRuntime()).toStrictEqual("92");
        expect(movie.getDirector()).toStrictEqual("Tim Burton");
        expect(movie.getGenres()).toStrictEqual(["Comedy", "Fantasy"]);
        expect(movie.getActors()).toStrictEqual("Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page");
        expect(movie.getPlot()).toStrictEqual("A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.");
        expect(movie.getPosterUrl()).toStrictEqual("https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg");
    });
    it("should create movie from constructor props without optional properties", () => {
        const movie = new Movie({
            id: 1,
            title: "Beetlejuice",
            year: 1988,
            runtime: 92,
            director: "Tim Burton",
            genres: ["Comedy", "Fantasy"]
        });
        expect(movie.getActors()).toBeUndefined();
        expect(movie.getPlot()).toBeUndefined();
        expect(movie.getPosterUrl()).toBeUndefined();
    })
})