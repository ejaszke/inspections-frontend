import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { deleteInspection, setDeleteDialogOpen } from '../store/inspectionSlice';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

export default function InspectionDeleteDialogContainer() {
    const dispatch = useDispatch();
    const { isDeleteDialogOpen, deleteData } = useSelector((state: RootState) => state.inspections);

    const handleDelete = () => {
        if (deleteData && deleteData.id) {
            dispatch(deleteInspection(deleteData.id));
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
            <CModalBody>Czy na pewno usunąć inspekcje ?</CModalBody>
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
