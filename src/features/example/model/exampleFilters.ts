import { BasicFilters } from '../../shared/model/basicFilters';

export interface ExampleFilters extends BasicFilters {
    name?: string;
    group?: string;
}
