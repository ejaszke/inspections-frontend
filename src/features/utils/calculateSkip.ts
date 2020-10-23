import { TableChangeState } from 'react-bootstrap-table-next';
import { PageInfo } from '../shared/model/pageInfo';

export function calculateSkip<T>(newState: TableChangeState<PageInfo<T>>): number {
    return (newState.page - 1) * newState.sizePerPage;
}
