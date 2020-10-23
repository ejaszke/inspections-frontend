import React from 'react';
import CFormikInput from '../../../core/components/CFormikInput';
import { useDispatch, useSelector } from 'react-redux';
import { setRegisterDialogOpen } from '../store/exampleSlice';
import * as Yup from 'yup';
import {
    CButton,
    CFormGroup,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';
import { Form, Formik, FormikHelpers as FormikActions } from 'formik';
import { RootState } from '../../../app/rootReducer';
import { Button } from 'reactstrap';

interface FormValues {
    name: string;
    group: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nazwa wymagana'),
    group: Yup.string().required('Grupa wymagana'),
});

const initialValues: FormValues = {
    name: '',
    group: '',
};

export default function ExampleRegisterFormContainer() {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((state: RootState) => state.example.isRegisterDialogOpen);

    const handleSubmit = (values: FormValues, helpers: FormikActions<FormValues>) => {
        // dispatch(registerProductGroup(values.name, values.group));
        helpers.resetForm({});
    };

    return (
        <>
            <CFormGroup>
                <Button color="success" onClick={() => dispatch(setRegisterDialogOpen(true))}>
                    Dodaj grupę
                </Button>
            </CFormGroup>
            <CModal show={isDialogOpen} onClose={() => dispatch(setRegisterDialogOpen(false))}>
                <CModalHeader closeButton>
                    <CModalTitle>Dodaj grupę produktów</CModalTitle>
                </CModalHeader>
                {isDialogOpen && (
                    <Formik<FormValues>
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid, resetForm }) => (
                            <Form>
                                <CModalBody>
                                    <CLabel>{'Nazwa'}</CLabel>
                                    <CFormikInput id="name" name="name" type="text" />
                                    <CLabel>{'Grupa'}</CLabel>
                                    <CFormikInput id="group" name="group" type="text" />
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="primary" type="submit" disabled={!isValid}>
                                        Zapisz
                                    </CButton>
                                    <CButton
                                        color="secondary"
                                        onClick={() => {
                                            dispatch(setRegisterDialogOpen(false));
                                            resetForm();
                                        }}
                                    >
                                        Anuluj
                                    </CButton>
                                </CModalFooter>
                            </Form>
                        )}
                    </Formik>
                )}
            </CModal>
        </>
    );
}
