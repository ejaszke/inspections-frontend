import React, { useEffect, useState } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { PageInfo } from '../../shared/model/pageInfo';
import { Example } from '../model/example';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { loadProductGroups } from '../store/exampleSlice';
import BootstrapTable, { TableChangeState, TableChangeType } from 'react-bootstrap-table-next';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import ExampleActionsComponent from '../components/ExampleActionsComponent';
import ExampleEditFormContainer from './ExampleEditFormContainer';
import ExampleRegisterFormContainer from './ExampleRegisterFormContainer';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { NoDataComponent } from '../../shared/components/NoDataComponent';
import { ExampleDeleteDialogComponent } from '../components/ExampleDeleteDialogComponent';
import { calculateSkip } from '../../utils/calculateSkip';
import { getFilterFieldValue } from '../../utils/getFilterFieldValue';

const columns = [
    {
        dataField: 'name',
        text: 'Nazwa',
        sort: true,
        filter: textFilter({ placeholder: ' ' }),
    },
    {
        dataField: 'group',
        text: 'Grupa',
        sort: true,
        filter: textFilter({ placeholder: ' ' }),
    },
    {
        dataField: 'actions',
        text: '',
        formatter: ExampleActionsComponent,
        headerAttrs: { width: 110 },
    },
];

export default function ExampleTableContainer() {
    const dispatch = useDispatch();
    const productGroups = useSelector((state: RootState) => state.example.productGroups);
    const { total, limit, sortField, sortOrder } = productGroups;
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        dispatch(loadProductGroups({ limit: 10, skip: 0, sortOrder, sortField }));
    }, [dispatch, sortOrder, sortField]);

    const onTableChange = (type: TableChangeType, newState: TableChangeState<PageInfo<Example>>) => {
        setPage(newState.page);
        const sortOrderResult = newState.sortOrder ? newState.sortOrder : sortOrder;
        const sortFieldResult = newState.sortField ? newState.sortField : sortField;

        const name = getFilterFieldValue('name', newState.filters);
        const group = getFilterFieldValue('group', newState.filters);

        dispatch(
            loadProductGroups({
                limit: newState.sizePerPage,
                skip: calculateSkip(newState),
                sortOrder: sortOrderResult,
                sortField: sortFieldResult,
                name,
                group,
            }),
        );
    };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardBody>
                        <ExampleRegisterFormContainer />
                        <BootstrapTable
                            wrapperClasses="table-responsive"
                            remote
                            bootstrap4
                            keyField="id"
                            data={productGroups.data}
                            striped
                            filter={filterFactory()}
                            noDataIndication={NoDataComponent}
                            pagination={paginationFactory({ page: page, sizePerPage: limit, totalSize: total })}
                            onTableChange={onTableChange}
                            columns={columns}
                        />
                    </CCardBody>
                    <ExampleEditFormContainer />
                    <ExampleDeleteDialogComponent />
                </CCard>
            </CCol>
        </CRow>
    );
}
