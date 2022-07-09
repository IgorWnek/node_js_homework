export interface JsonDatabaseInterface {
    getJson(): Promise<any>;
    saveJson(json: any): void;
}