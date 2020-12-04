import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { RootState } from '../../../app/rootReducer';
import * as Yup from 'yup';
import { CButton, CCol, CLabel, CModalBody, CModalFooter, CRow } from '@coreui/react';
import {
    editInspection,
    registerInspection,
    setUpdatedInspection,
    resetUpdatedInspection,
    setRegisterDialogOpen,
} from '../store/inspectionSlice';
import CFormikInput from '../../../core/components/CFormikInput';
import { Inspection } from '../model/inspection';

interface FormValues {
    city: string;
    street: string;
    street_number: string;
    staircases: string;
}

const message = 'Pole wymagane';
const validationSchema = Yup.object<FormValues>().shape({
    city: Yup.string().required(message),
    street: Yup.string().required(message),
    street_number: Yup.string().required(message),
    staircases: Yup.string().required(message),
});

interface Props {
    isEditMode: boolean;
}

export default function InspectionFormContainer(props: Props) {
    const dispatch = useDispatch();
    const { isEditMode } = props;
    const currentInspection = useSelector((state: RootState) => state.inspections.updatedInspection);

    const handleSubmit = (values: FormValues) => {
        if (!isEditMode) {
            dispatch(registerInspection({ ...values }));
        } else if (currentInspection?.id) {
            dispatch(
                editInspection(currentInspection.id, {
                    ...currentInspection,
                    ...values,
                }),
            );
        }
    };

    useEffect(() => {
        return () => {
            dispatch(resetUpdatedInspection());
        };
    }, [dispatch]);

    const handleClose = () => {
        dispatch(setRegisterDialogOpen(false));
    };

    const renderPrintPdfRow = (currentInspection: Inspection) => {
        return (
            currentInspection?.id && (
                <CRow>
                    <CCol xs="12" className="text-right">
                        <CButton
                            color="secondary"
                            type="button"
                            onClick={() => {
                                window.open('http://localhost:3000/api/pdfs/' + currentInspection.id);
                            }}
                        >
                            Wydrukuj
                        </CButton>
                    </CCol>
                </CRow>
            )
        );
    };

    return (
        <>
            <Formik<FormValues>
                enableReinitialize
                initialValues={currentInspection}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid, resetForm }) => (
                    <Form>
                        <CModalBody>
                            {renderPrintPdfRow(currentInspection)}
                            <CRow>
                                <CCol xs="6">
                                    <CLabel>{'Miasto*'}</CLabel>
                                    <CFormikInput id="city" name="city" type="text" />
                                </CCol>
                                <CCol xs="6">
                                    <CLabel>{'Ulica*'}</CLabel>
                                    <CFormikInput id="street" name="street" type="text" />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="6">
                                    <CLabel>{'Nr ulicy*'}</CLabel>
                                    <CFormikInput id="street_number" name="street_number" type="text" />
                                </CCol>
                                <CCol xs="6">
                                    <CLabel>{'Klatki schodowe*'}</CLabel>
                                    <CFormikInput id="staircases" name="staircases" type="text" />
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
