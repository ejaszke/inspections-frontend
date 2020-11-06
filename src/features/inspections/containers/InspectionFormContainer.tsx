import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { RootState } from '../../../app/rootReducer';
import * as Yup from 'yup';
import {
	CButton,
	CCol,
	CLabel,
	CModalBody,
	CModalFooter,
	CRow
} from '@coreui/react';
import {
	editInspection,
	registerInspection, setEditedData,
	setRegisterDialogOpen
} from '../store/inspectionSlice';
import CFormikInput from '../../../core/components/CFormikInput';

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
	const {isEditMode} = props;
	const {editedData} = useSelector((state: RootState) => state.inspections);

	const handleSubmit = (values: FormValues) => {
		if (!isEditMode) {
			dispatch(registerInspection({...values}));
		} else if (editedData && editedData.id) {
			dispatch(
				editInspection(editedData.id, {
					...editedData,
					...values,
				}),
			);
		}
	};

	useEffect(() => {
		// CLEAN UP
		return () => {
			dispatch(setEditedData(null));
		}
	},[dispatch]);

	const handleClose = () => {
		dispatch(setRegisterDialogOpen(false));
	};

	return (<>
		<Formik<FormValues>
			enableReinitialize
			initialValues={{
				city: editedData ? editedData.city : '',
				street: editedData ? editedData.street : '',
				street_number: editedData ? editedData.street_number : '',
				staircases: editedData ? editedData.staircases : '',
			}}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({isValid, resetForm}) =>
				<Form>
					<CModalBody>
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
			}
		</Formik>
	</>)
}
