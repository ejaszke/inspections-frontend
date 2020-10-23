import { Example } from '../features/example/model/example';
import { PageInfo } from '../features/shared/model/pageInfo';
import { ExampleFilters } from '../features/example/model/exampleFilters';

const data: PageInfo<Example> = {
    total: 0,
    limit: 0,
    skip: 0,
    sortOrder: 'asc',
    sortField: 'name',
    data: [
        {
            id: 'id-1',
            name: 'name-1',
            group: 'group-1'
        },
        {
            id: 'id-2',
            name: 'name-2',
            group: 'group-2'
        },
        {
            id: 'id-3',
            name: 'name-3',
            group: 'group-3'
        },
        {
            id: 'id-4',
            name: 'name-4',
            group: 'group-4'
        },
        {
            id: 'id-5',
            name: 'name-5',
            group: 'group-5'
        },
        {
            id: 'id-6',
            name: 'name-6',
            group: 'group-6'
        },
    ],
};

export const ExampleApi = {
    fetchExample: (filters: ExampleFilters): PageInfo<Example> =>
        data
};

