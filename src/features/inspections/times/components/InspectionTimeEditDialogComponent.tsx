import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/rootReducer';
import { CModal, CModalHeader, CModalTitle } from '@coreui/react';
import { setEditDialogOpen } from '../store/inspectionTimeSlice';
import InspectionTimesFormContainer from '../containers/InspectionTimesFormContainer';

export default function InspectionTimeEditDialogComponent() {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((state: RootState) => state.inspectionTimes.isEditDialogOpen);

    return (
        <CModal
            show={isDialogOpen}
            closeOnBackdrop={false}
            size={'lg'}
            onClose={() => dispatch(setEditDialogOpen(false, null))}
        >
            <CModalHeader closeButton>
                <CModalTitle>Edytuj czas inspekcji</CModalTitle>
            </CModalHeader>
            {isDialogOpen && <InspectionTimesFormContainer isEditMode />}
        </CModal>
    );
}
