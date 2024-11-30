export interface IDataItems {
    id: number,
    title: string,
    description: string,
    updatedAt: string,
    countryId: number,
    categoryId: number,
    imageOfItems: {
        id: number,
        url: string,
    }[],
}

