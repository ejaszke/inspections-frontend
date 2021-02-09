import React, { useEffect } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { loadInspections } from '../store/inspectionSlice';
import { NoDataComponent } from '../../shared/components/NoDataComponent';
import BootstrapTable from 'react-bootstrap-table-next';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import InspectionRegisterDialogComponent from '../components/InspectionRegisterDialogComponent';
import InspectionActionsComponent from '../components/InspectionActionsComponent';
import InspectionDeleteDialogContainer from '../components/InspectionDeleteDialogContainer';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [
    {
        dataField: 'city',
        text: 'Miasto',
    },
    {
        dataField: 'street',
        text: 'Ulica',
    },
    {
        dataField: 'street_number',
        text: 'Nr ulicy',
    },
    {
        dataField: 'staircases',
        text: 'Klatki schodowe',
    },
    {
        dataField: 'employee',
        text: 'Pracownik',
    },
    {
        dataField: 'created_at',
        text: 'Data utworzenia',
    },
    {
        dataField: 'flat_count',
        text: 'Ilość mieszkań',
    },
    {
        dataField: 'actions',
        text: '',
        formatter: InspectionActionsComponent,
        headerAttrs: { width: 110 },
    },
];

const options = {
    sizePerPageList: [
        {
            text: '15',
            value: 15,
        },
        {
            text: '25',
            value: 25,
        },
        {
            text: '50',
            value: 50,
        },
    ],
};

export default function InspectionTableContainer() {
    const dispatch = useDispatch();
    const { inspections } = useSelector((state: RootState) => state.inspections);

    useEffect(() => {
        dispatch(loadInspections());
    }, [dispatch]);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardBody>
                        <InspectionRegisterDialogComponent />
                        <BootstrapTable
                            wrapperClasses={inspections.length > 1 ? 'table-responsive' : ''}
                            bootstrap4
                            keyField="id"
                            data={inspections}
                            striped
                            noDataIndication={NoDataComponent}
                            pagination={paginationFactory(options)}
                            columns={columns}
                        />
                        <InspectionDeleteDialogContainer />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
