import fs from "fs/promises";
import { vol } from "memfs";
import { FileJsonDatabase } from "../../../../../src/infrastructure/data-layer/data-source/database/FileJsonDatabase";

jest.mock("fs/promises");

describe("File JSON Database", () => {
    const virtualFilePath = "/movies_db.json";
    let fileJsonDatabase = new FileJsonDatabase(virtualFilePath);

    beforeEach(() => {
        jest.clearAllMocks();
        vol.reset();
    })

    describe("getJson", () => {
        it("should return parsed json object from file system", async () => {
            const initialJsonObject = { movies: [{ "id": 1, "title": "Beetlejuice", "year": "1988", "runtime": "92", "director": "Tim Burton", "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", "plot": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" }] };
            await fs.writeFile(virtualFilePath, JSON.stringify(initialJsonObject));

            const resultJsonObject = await fileJsonDatabase.getJson();

            expect(resultJsonObject).toStrictEqual(initialJsonObject);
        })
    })
    describe("saveJson", () => {
        it("should save updated json object into database json file", async () => {
            const initialJsonObject = { movies: [] };
            await fs.writeFile(virtualFilePath, JSON.stringify(initialJsonObject));

            const updatedJsonObject =  { movies: [{ "id": 1, "title": "Beetlejuice", "year": "1988", "runtime": "92", "director": "Tim Burton", "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page", "plot": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.", "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg" }] };
            await fileJsonDatabase.saveJson(updatedJsonObject);
            const resultJsonObject = await fileJsonDatabase.getJson();

            expect(resultJsonObject).toStrictEqual(updatedJsonObject);
        })
    })
})