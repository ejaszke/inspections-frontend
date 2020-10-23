export interface PageInfo<T> {
    total: number;
    limit: number;
    skip: number;
    sortOrder: string;
    sortField: string;
    data: T[];
}
