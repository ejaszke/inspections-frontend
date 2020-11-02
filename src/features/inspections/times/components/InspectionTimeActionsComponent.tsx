import React from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import store from '../../../../app/store';
import { InspectionTime } from '../model/inspectionTime';
import { setDeleteDialogOpen } from '../store/inspectionTimeSlice';

export default function InspectionTimeActionsComponent(cell: string, inspectionTime: InspectionTime) {
	const { dispatch } = store;

	const handleDeleteInspectionTime = () => {
		dispatch(setDeleteDialogOpen(true, inspectionTime));
	};

	return (
		<CDropdown className="m-1 d-inline-block">
			<CDropdownToggle color="secondary">Opcje</CDropdownToggle>
			<CDropdownMenu placement="bottom">
				{/*<CDropdownItem href={`#/inspections/all/edit/${inspectionTime.id}`}>Edytuj</CDropdownItem>*/}
				<CDropdownItem onClick={handleDeleteInspectionTime}>Usuń</CDropdownItem>
			</CDropdownMenu>
		</CDropdown>
	);
}
