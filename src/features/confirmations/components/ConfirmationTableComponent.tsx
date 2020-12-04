import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import BootstrapTable from 'react-bootstrap-table-next';
import { NoDataComponent } from '../../shared/components/NoDataComponent';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [
	{
		dataField: 'answer',
		text: 'Odpowiedź',
	},
	{
		dataField: 'additional_notes',
		text: 'Dodatkowe informacje'
	},
	{
		dataField: 'created_at',
		text: 'Data utworzenia'
	},
];

const options = {
	sizePerPageList: [
		{
			text: '5',
			value: 5,
		},
		{
			text: '15',
			value: 15,
		},
	],
};

export default function ConfirmationTableComponent() {
	const editedData = useSelector((state: RootState) => state.inspections.editedData);
	const inspectionConfirmations = editedData && editedData.confirmations ? editedData.confirmations : [];

	return (
		<CRow>
			<CCol>
				<CCard>
					<CCardBody>
						<BootstrapTable
							wrapperClasses={inspectionConfirmations.length > 1 ? 'table-responsive' : ''}
							bootstrap4
							keyField="id"
							data={inspectionConfirmations}
							striped
							noDataIndication={NoDataComponent}
							pagination={paginationFactory(options)}
							columns={columns}
						/>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	)
}
