import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { CFormGroup, CModal, CModalHeader, CModalTitle } from '@coreui/react';
import { Button } from 'reactstrap';
import { setRegisterDialogOpen } from '../store/inspectionSlice';
import InspectionFormContainer from '../containers/InspectionFormContainer';

export default function InspectionRegisterDialogComponent() {
	const dispatch = useDispatch();
	const isDialogOpen = useSelector((state: RootState) => state.inspections.isRegisterDialogOpen);

	return (<>
		<CFormGroup>
			<Button color="success" onClick={() => dispatch(setRegisterDialogOpen(true))}>
				Dodaj inspekcje
			</Button>
		</CFormGroup>
		<CModal
			show={isDialogOpen}
			closeOnBackdrop={false}
			size={'lg'}
			onClose={() => dispatch(setRegisterDialogOpen(false))}
		>
			<CModalHeader closeButton>
				<CModalTitle>Dodaj inspekcje</CModalTitle>
			</CModalHeader>
			{isDialogOpen && <InspectionFormContainer isEditMode={false} />}
		</CModal>
	</>)
}
