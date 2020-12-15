import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/rootReducer';
import { CFormGroup, CModal, CModalHeader, CModalTitle } from '@coreui/react';
import { Button } from 'reactstrap';
import { setRegisterDialogOpen } from '../store/inspectionTimeSlice';
import InspectionTimesFormContainer from '../containers/InspectionTimesFormContainer';

export default function InspectionTimeRegisterDialogComponent() {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((state: RootState) => state.inspectionTimes.isRegisterDialogOpen);

    return (
        <>
            <CFormGroup>
                <Button color="success" onClick={() => dispatch(setRegisterDialogOpen(true))}>
                    Dodaj czas inspekcji
                </Button>
            </CFormGroup>
            <CModal
                show={isDialogOpen}
                closeOnBackdrop={false}
                size={'lg'}
                onClose={() => dispatch(setRegisterDialogOpen(false))}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Dodaj czas inspekcji</CModalTitle>
                </CModalHeader>
                {isDialogOpen && <InspectionTimesFormContainer isEditMode={false} />}
            </CModal>
        </>
    );
}
