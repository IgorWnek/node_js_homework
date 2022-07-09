export interface DataSourceInterface<EntityType, AddDTOType> {
    fetchAll(): Promise<EntityType[]>;
    insert(addDTOType: AddDTOType): Promise<number>;
}