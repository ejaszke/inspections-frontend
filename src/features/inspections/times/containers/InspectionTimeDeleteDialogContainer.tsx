import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	CButton,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CModalTitle
} from '@coreui/react';
import { RootState } from '../../../../app/rootReducer';
import { deleteInspectionTime, setDeleteDialogOpen } from '../store/inspectionTimeSlice';

export default function InspectionTimeDeleteDialogContainer() {
	const dispatch = useDispatch();
	const { isDeleteDialogOpen, deleteData } = useSelector((state: RootState) => state.inspectionTimes);
	const inspection = useSelector((state: RootState) => state.inspections.editedData);

	const handleDelete = () => {
		if (deleteData && deleteData.id && inspection && inspection.id) {
			dispatch(deleteInspectionTime(inspection.id, deleteData.id))
		}
	};

	const handleCancel = () => {
		dispatch(setDeleteDialogOpen(false, null));
	};

	return (
		<CModal show={isDeleteDialogOpen} onClose={handleCancel}>
			<CModalHeader closeButton>
				<CModalTitle>Potwierdzenie</CModalTitle>
			</CModalHeader>
			<CModalBody>Czy na pewno usunąć czas inspekcji ?</CModalBody>
			<CModalFooter>
				<CButton color="primary" type="submit" onClick={handleDelete}>
					Ok
				</CButton>
				<CButton color="secondary" onClick={handleCancel}>
					Anuluj
				</CButton>
			</CModalFooter>
		</CModal>
	);
}
