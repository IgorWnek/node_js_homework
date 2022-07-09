import { JsonDatabaseInterface } from "./JsonDatabaseInterface";
import fs from "fs/promises";

export class FileJsonDatabase implements JsonDatabaseInterface {
    private readonly filePath: string;

    public constructor(filePath: string) {
        this.filePath = filePath;
    }

    public async getJson(): Promise<any> {
        const moviesFileBuffer = await fs.readFile(this.filePath);

        return JSON.parse(moviesFileBuffer.toString());
    }

    async saveJson(json: any): Promise<void> {
        const updatedMoviesBuffer = JSON.stringify(json);
        await fs.writeFile(this.filePath, updatedMoviesBuffer);
    }
}