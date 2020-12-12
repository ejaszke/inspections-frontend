import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { loadInspectionById } from '../store/inspectionSlice';
import { CCard, CCol, CRow } from '@coreui/react';
import InspectionFormContainer from '../containers/InspectionFormContainer';
import InspectionTimeTableComponent from '../times/components/InspectionTimeTableComponent';
import ConfirmationTableComponent from '../../confirmations/components/ConfirmationTableComponent';

export default function InspectionEditComponent() {
    const inspectionId = useParams<{ id: string }>().id;
    const dispatch = useDispatch();

    useEffect(() => {
        if (inspectionId) {
            dispatch(loadInspectionById(inspectionId));
        }
    }, [dispatch, inspectionId]);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <InspectionFormContainer isEditMode />
                </CCard>

                <InspectionTimeTableComponent />

                <ConfirmationTableComponent />
            </CCol>
        </CRow>
    );
}
