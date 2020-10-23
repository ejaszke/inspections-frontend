import React from 'react';
import { CButton, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { setEditDialogOpen } from '../store/exampleSlice';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CFormikInput from '../../../core/components/CFormikInput';

interface FormValues {
    name: string;
    group: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nazwa wymagana'),
    group: Yup.string().required('Grupa wymagana'),
});

export default function ExampleEditFormContainer() {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((state: RootState) => state.example.isEditDialogOpen);
    const productGroup = useSelector((state: RootState) => state.example.editedData);

    const handleClose = () => {
        dispatch(setEditDialogOpen(false, null));
    };

    const handleSubmit = (values: FormValues) => {
        if (productGroup) {
            // dispatch(editProductGroup(productGroup.id, values.name, values.group));
        }
    };

    return (
        <>
            <CModal show={isDialogOpen} onClose={handleClose} closeOnBackdrop={false}>
                <CModalHeader closeButton>
                    <CModalTitle>Edytuj dane</CModalTitle>
                </CModalHeader>
                {isDialogOpen && (
                    <Formik<FormValues>
                        enableReinitialize
                        initialValues={{
                            name: productGroup ? productGroup.name : '',
                            group: productGroup ? productGroup.group : '',
                        }}
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
                )}
            </CModal>
        </>
    );
}
