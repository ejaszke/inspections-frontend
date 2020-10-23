import React from 'react';
import { setDeleteDialogOpen } from '../store/exampleSlice';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';

export function ExampleDeleteDialogComponent() {
    const dispatch = useDispatch();
    const { isDeleteDialogOpen, deleteData } = useSelector((state: RootState) => state.example);

    const handleDelete = () => {
        if (deleteData) {
            // dispatch(delete(deleteData.id));
        }
    };

    const handleCancel = () => {
        dispatch(setDeleteDialogOpen(false, null));
    };

    return (
        <>
            <CModal show={isDeleteDialogOpen} onClose={handleCancel}>
                <CModalHeader closeButton>
                    <CModalTitle>Potwierdzenie</CModalTitle>
                </CModalHeader>
                <CModalBody>Czy na pewno usunąć grupę ?</CModalBody>
                <CModalFooter>
                    <CButton color="primary" type="submit" onClick={handleDelete}>
                        Ok
                    </CButton>
                    <CButton color="secondary" onClick={handleCancel}>
                        Anuluj
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
