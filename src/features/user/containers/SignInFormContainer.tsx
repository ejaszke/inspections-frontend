import React from 'react';
import {
	CButton,
	CCard,
	CCardBody,
	CCol,
	CLabel,
	CRow
} from '@coreui/react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import CFormikInput from '../../../core/components/CFormikInput';
import { Credentials } from '../model/credentials';
import { login } from '../store/userSlice';

const validationSchema = Yup.object<Credentials>().shape({
	username: Yup.string().required('Pole wymagane'),
	password: Yup.string().required('Pole wymagane')
});

export function SignInFormContainer() {
	const dispatch = useDispatch();

	const handleSubmit = (values: Credentials) => {
		dispatch(login(values));
	};


	return <CCard className="p-4">
		<CCardBody>
			<h1>Logowanie</h1>
			<Formik<Credentials>
				initialValues={{
					username: '',
					password: ''
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({isValid}) => (
					<Form>

						<CLabel>{'Nazwa użytkownika'}</CLabel>
						<CFormikInput id="username"
									  name="username"
									  type="text"
						/>
						<CLabel>{'Hasło'}</CLabel>
						<CFormikInput id="password"
									  name="password"
									  type="password"
						/>
						<CRow>
							<CCol xs="6">
								<CButton color="primary"
										 className="px-4"
										 type="submit"
										 disabled={!isValid}
								>
									Zaloguj
								</CButton>
							</CCol>
						</CRow>
					</Form>
				)}
			</Formik>
		</CCardBody>
	</CCard>
}
