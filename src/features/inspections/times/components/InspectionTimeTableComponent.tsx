import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/rootReducer';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { NoDataComponent } from '../../../shared/components/NoDataComponent';
import InspectionTimeRegisterDialogComponent from './InspectionTimeRegisterDialogComponent';
import InspectionTimeActionsComponent from './InspectionTimeActionsComponent';
import InspectionTimeDeleteDialogContainer from '../containers/InspectionTimeDeleteDialogContainer';
import InspectionTimeEditDialogComponent from './InspectionTimeEditDialogComponent';

const columns = [
	{
		dataField: 'date',
		text: 'Data',
	},
	{
		dataField: 'start_time',
		text: 'Godzina ropoczęcia',
	},
	{
		dataField: 'end_time',
		text: 'Godzina zakończenia',
	},
	{
		dataField: 'actions',
		text: '',
		formatter: InspectionTimeActionsComponent,
		headerAttrs: {width: 110},
	}
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

export default function InspectionTimeTableComponent() {
	const editedData = useSelector((state: RootState) => state.inspections.editedData);
	const inspectionTimes = editedData && editedData.times ? editedData.times : [];

	return (
		<CRow>
			<CCol>
				<CCard>
					<CCardBody>
						<InspectionTimeRegisterDialogComponent/>
						<BootstrapTable
							wrapperClasses={inspectionTimes.length > 1 ? 'table-responsive' : ''}
							bootstrap4
							keyField="id"
							data={inspectionTimes}
							striped
							noDataIndication={NoDataComponent}
							pagination={paginationFactory(options)}
							columns={columns}
						/>
						<InspectionTimeEditDialogComponent/>
						<InspectionTimeDeleteDialogContainer/>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	)
}
