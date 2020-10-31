import React from 'react';
import { CCard, CCardBody } from '@coreui/react';

export function SignInInfoComponent() {

	return <CCard className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
		<CCardBody className="text-center">
			<div>
				<h2>Inspekcje</h2>
				<p>
					Uzytkownik: demo@email.com
				</p>
				<p>
					Haslo: demouser
				</p>
			</div>
		</CCardBody>
	</CCard>
}
