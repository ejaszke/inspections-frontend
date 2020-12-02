import React from 'react';
import {
	CButton,
	CCard, CCardBody,
	CCardGroup,
	CCol,
	CContainer, CLabel,
	CRow
} from '@coreui/react';
import { Form, Formik, FormikHelpers as FormikActions } from 'formik';
import CFormikInput from '../../../core/components/CFormikInput';
import CFormikSelect from '../../../core/components/CFormikSelect';
import * as Yup from 'yup';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { registerInspectionConfirmation } from '../../inspections/store/inspectionSlice';
import { InspectionConfirmation } from '../model/inspectionConfirmation';
import { inspectionConfirmationSuggestions } from '../model/inspectionConfirmationSuggestions';

interface FormValues {
	answer: string;
	additional_notes: string;
}

const validationSchema = Yup.object<FormValues>().shape({
	answer: Yup.string().required('Pole wymagane'),
	additional_notes: Yup.string().notRequired()
});

export default function ConfirmationFormComponent() {
	const inspectionId = useParams<{id: string}>().id;
	const dispatch = useDispatch();

	const handleSubmit = (values: FormValues, helpers: FormikActions<FormValues>) => {
		const inspectionConfirmation: InspectionConfirmation = {
			...values
		};
		dispatch(registerInspectionConfirmation(inspectionId, inspectionConfirmation));
		helpers.resetForm({});
	};

	return <div className="c-app c-default-layout flex-row align-items-center">
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
										additional_notes: ''
									}}
									validationSchema={validationSchema}
									onSubmit={handleSubmit}
								>
									{({isValid}) => (
										<Form>
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
												<CCol xs="12">
											<CLabel>{'Dodatkowe informacje kontaktowe'}</CLabel>
											<CFormikInput id="additional_notes"
														  name="additional_notes"
														  type="additional_notes"
											/>
												</CCol>
											</CRow>
											<CRow>
												<CCol xs="6">
													<CButton color="primary"
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
}
