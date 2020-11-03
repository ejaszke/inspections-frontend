import React from 'react';
import {
	CCardGroup,
	CCol,
	CContainer,
	CRow
} from '@coreui/react';
import { SignInInfoComponent } from './SignInInfoComponent';
import { SignInFormContainer } from '../containers/SignInFormContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { Redirect } from 'react-router';

export default function SignIn() {
	const token = useSelector((state: RootState) => state.user.token);

	if (token) {
		return <Redirect to={'/all'}/>
	}

	return <div className="c-app c-default-layout flex-row align-items-center">
		<CContainer>
			<CRow className="justify-content-center">
				<CCol md="8">
					<CCardGroup>

						<SignInFormContainer/>

						<SignInInfoComponent/>

					</CCardGroup>
				</CCol>
			</CRow>
		</CContainer>
	</div>
}
