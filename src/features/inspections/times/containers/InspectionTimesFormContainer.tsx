import React, { useState } from 'react';
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
import {
	CButton,
	CCol,
	CFormGroup,
	CInputCheckbox,
	CLabel,
	CModalBody,
	CModalFooter,
	CRow,
} from '@coreui/react';

interface FormValues {
	date: Date | string;
	start_time: Date | string;
	end_time: Date | string;
	is_repeated: boolean;
	apartment_notes: string
}

const message = 'Pole wymagane';
const validationSchema = Yup.object<FormValues>().shape({
	date: Yup.date().required(message),
	start_time: Yup.string().required(message),
	end_time: Yup.string().required(message),
	is_repeated: Yup.boolean().required(message),
	apartment_notes: Yup.string().notRequired(),
});

interface Props {
	isEditMode: boolean;
}

export default function InspectionTimesFormContainer(props: Props) {
	const dispatch = useDispatch();
	const {isEditMode} = props;
	const inspectionId = useParams<{id: string}>().id;
	const {editedData} = useSelector((state: RootState) => state.inspectionTimes);
	const [isRepeated, setIsRepeated] = useState<boolean>(editedData?.is_repeated ? editedData.is_repeated : false);

	const handleSubmit = (values: FormValues) => {
		if (!isEditMode) {
			dispatch(registerInspectionTime(inspectionId, {...values}));
		} else if (editedData && editedData.id) {
			dispatch(
				editInspectionTime(inspectionId, editedData.id, {
					...editedData,
					is_repeated: values.is_repeated,
					date: values.date,
					start_time: values.start_time,
					end_time: values.end_time,
					apartment_notes: values.apartment_notes,
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
		<Formik<FormValues>
			enableReinitialize
			initialValues={{
				date: editedData?.date ? formatDate('date', editedData.date) : '',
				start_time: editedData?.start_time ? editedData.start_time : '',
				end_time: editedData?.end_time ? editedData.end_time : '',
				is_repeated: editedData?.is_repeated ? editedData.is_repeated : false,
				apartment_notes: editedData?.apartment_notes ? editedData.apartment_notes : '',
			}}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({isValid, resetForm, setFieldValue}) => (
				<Form>
					<CModalBody>
						<CRow>
							<CCol xs="4">
								<CLabel>{'Data*'}</CLabel>
								<CFormikInput id="date" name="date" type="date"/>
							</CCol>
							<CCol xs="4">
								<CLabel>{'Godzina rozpoczęcia*'}</CLabel>
								<CFormikInput id="start_time" name="start_time" type="text" placeholder="HH:MM"/>
							</CCol>
							<CCol xs="4">
								<CLabel>{'Godzina zakończenia*'}</CLabel>
								<CFormikInput id="end_time" name="end_time" type="text" placeholder="HH:MM"/>
							</CCol>
						</CRow>
						<CRow>
							<CCol xs="8">
								<CLabel>{'Mieszkania'}</CLabel>
								<CFormikInput id="apartment_notes" name="apartment_notes" type="text"/>
							</CCol>
							<CCol xs="4">
								<CFormGroup variant="custom-checkbox">
									<CInputCheckbox id="is_repeated"
													name="is_repeated"
													custom
													checked={isRepeated}
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														setIsRepeated(e.target.checked);
														setFieldValue('is_repeated', e.target.checked);
													}}
									/>
									<CLabel variant="custom-checkbox" htmlFor="is_repeated" className="my-lg-4">
										Termin poprawkowy
									</CLabel>
								</CFormGroup>
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
	);
}
