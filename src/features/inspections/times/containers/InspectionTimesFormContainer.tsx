import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { RootState } from '../../../../app/rootReducer';
import {
    editInspectionTime,
    registerInspectionTime,
    setEditDialogOpen,
    setRegisterDialogOpen,
} from '../store/inspectionTimeSlice';
import { useParams } from 'react-router';
import { formatDate } from '../../../utils/date/formatDate';
import CFormikInput from '../../../../core/components/CFormikInput';
import { CButton, CCol, CLabel, CModalBody, CModalFooter, CRow } from '@coreui/react';

interface FormValues {
    date: Date | string;
    start_time: Date | string;
    end_time: Date | string;
}

const message = 'Pole wymagane';
const validationSchema = Yup.object<FormValues>().shape({
    date: Yup.date().required(message),
    start_time: Yup.string().required(message),
    end_time: Yup.string().required(message),
});

interface Props {
    isEditMode: boolean;
}

export default function InspectionTimesFormContainer(props: Props) {
    const dispatch = useDispatch();
    const { isEditMode } = props;
    const inspectionId = useParams<{ id: string }>().id;
    const { editedData } = useSelector((state: RootState) => state.inspectionTimes);

    const handleSubmit = (values: FormValues) => {
        if (!isEditMode) {
            dispatch(registerInspectionTime(inspectionId, { ...values }));
        } else if (editedData && editedData.id) {
            dispatch(
                editInspectionTime(inspectionId, editedData.id, {
                    ...editedData,
                    ...values,
                }),
            );
        }
    };

    const handleClose = () => {
        if (!isEditMode) {
            dispatch(setRegisterDialogOpen(false));
        } else {
            dispatch(setEditDialogOpen(false, null));
        }
    };

    return (
        <>
            <Formik<FormValues>
                enableReinitialize
                initialValues={{
                    date: editedData && editedData.date ? formatDate('date', editedData.date) : '',
                    start_time: editedData && editedData.start_time ? editedData.start_time : '',
                    end_time: editedData && editedData.end_time ? editedData.end_time : '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid, resetForm }) => (
                    <Form>
                        <CModalBody>
                            <CRow>
                                <CCol xs="4">
                                    <CLabel>{'Data*'}</CLabel>
                                    <CFormikInput id="date" name="date" type="date" />
                                </CCol>
                                <CCol xs="4">
                                    <CLabel>{'Godzina rozpoczęcia*'}</CLabel>
                                    <CFormikInput id="start_time" name="start_time" type="text" placeholder="HH:MM" />
                                </CCol>
                                <CCol xs="4">
                                    <CLabel>{'Godzina zakończenia*'}</CLabel>
                                    <CFormikInput id="end_time" name="end_time" type="text" placeholder="HH:MM" />
                                </CCol>
                            </CRow>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="primary" type="submit" disabled={!isValid}>
                                Zapisz
                            </CButton>
                            <CButton
                                type="button"
                                color="secondary"
                                onClick={() => {
                                    handleClose();
                                    resetForm();
                                }}
                            >
                                Anuluj
                            </CButton>
                        </CModalFooter>
                    </Form>
                )}
            </Formik>
        </>
    );
}
