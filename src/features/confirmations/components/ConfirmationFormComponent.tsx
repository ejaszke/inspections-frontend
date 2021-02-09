import React, { useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CFormGroup,
    CInputRadio,
    CLabel,
    CRow,
} from '@coreui/react';
import { Field, Form, Formik, FormikHelpers as FormikActions } from 'formik';
import CFormikInput from '../../../core/components/CFormikInput';
import CFormikSelect from '../../../core/components/CFormikSelect';
import * as Yup from 'yup';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loadInspectionById, registerInspectionConfirmation } from '../../inspections/store/inspectionSlice';
import { InspectionConfirmation } from '../model/inspectionConfirmation';
import { inspectionConfirmationSuggestions } from '../model/inspectionConfirmationSuggestions';
import { RootState } from '../../../app/rootReducer';

interface FormValues {
    answer: string;
    time: string;
    building_no: string;
    flat_no: string;
    additional_notes: string;
}

const validationSchema = Yup.object<FormValues>().shape({
    answer: Yup.string().required('Pole wymagane'),
    building_no: Yup.string().required('Pole wymagane'),
    flat_no: Yup.string().required('Pole wymagane'),
    additional_notes: Yup.string().notRequired(),
});

export default function ConfirmationFormComponent() {
    const inspectionId = useParams<{ id: string }>().id;
    const dispatch = useDispatch();
    const currentInspection = useSelector((state: RootState) => state.inspections.updatedInspection);

    useEffect(() => {
        if (inspectionId) {
            dispatch(loadInspectionById(inspectionId));
        }
    }, [dispatch, inspectionId]);

    const handleSubmit = (values: FormValues, helpers: FormikActions<FormValues>) => {
        const inspectionConfirmation: InspectionConfirmation = {
            ...values,
            additional_notes: `data: ${values.time} klatka/mieszkanie:${values.building_no} / ${values.flat_no}, ${values.additional_notes}`,
        };
        dispatch(registerInspectionConfirmation(inspectionId, inspectionConfirmation));
        helpers.resetForm({});
    };

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <h1>Potwierdzenie</h1>
                                    <Formik<FormValues>
                                        initialValues={{
                                            answer: '',
                                            time: '',
                                            building_no: '',
                                            flat_no: '',
                                            additional_notes: '',
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isValid }) => (
                                            <Form>
                                                {currentInspection?.times?.map((time) => (
                                                    <CRow key={time.id}>
                                                        <CFormGroup variant="checkbox">
                                                            <CCol xs="12">
                                                                <label className="confirmation-time-radio">
                                                                    <Field type="radio" name="time" value={time.date} />
                                                                    {time.date}
                                                                </label>
                                                            </CCol>
                                                        </CFormGroup>
                                                    </CRow>
                                                ))}
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CFormikSelect name="answer" id="answer">
                                                            <option value="">Wybierz odpowiedź</option>
                                                            {inspectionConfirmationSuggestions.map((s, index) => (
                                                                <option value={s.title} key={index}>
                                                                    {`${s.title}`}
                                                                </option>
                                                            ))}
                                                        </CFormikSelect>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="6">
                                                        <CLabel>{'Numer klatki'}</CLabel>
                                                        <CFormikInput id="building_no" name="building_no" type="text" />
                                                    </CCol>
                                                    <CCol xs="6">
                                                        <CLabel>{'Numer mieszkania'}</CLabel>
                                                        <CFormikInput id="flat_no" name="flat_no" type="text" />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12">
                                                        <CLabel>{'Dodatkowe informacje'}</CLabel>
                                                        <CFormikInput
                                                            id="additional_notes"
                                                            name="additional_notes"
                                                            type="text"
                                                        />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="6">
                                                        <CButton
                                                            color="primary"
                                                            className="px-4"
                                                            type="submit"
                                                            disabled={!isValid}
                                                        >
                                                            Potwierdź
                                                        </CButton>
                                                    </CCol>
                                                </CRow>
                                            </Form>
                                        )}
                                    </Formik>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}
