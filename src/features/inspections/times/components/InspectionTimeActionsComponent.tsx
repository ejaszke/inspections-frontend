import React from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import store from '../../../../app/store';
import { InspectionTime } from '../model/inspectionTime';
import { setDeleteDialogOpen, setEditDialogOpen } from '../store/inspectionTimeSlice';

export default function InspectionTimeActionsComponent(cell: string, inspectionTime: InspectionTime) {
	const { dispatch } = store;

	const handleEditInspectionTime = () => {
		dispatch(setEditDialogOpen(true, inspectionTime));
	};

	const handleDeleteInspectionTime = () => {
		dispatch(setDeleteDialogOpen(true, inspectionTime));
	};

	return (
		<CDropdown className="m-1 d-inline-block">
			<CDropdownToggle color="secondary">Opcje</CDropdownToggle>
			<CDropdownMenu placement="bottom">
				<CDropdownItem onClick={handleEditInspectionTime}>Edytuj</CDropdownItem>
				<CDropdownItem onClick={handleDeleteInspectionTime}>Usuń</CDropdownItem>
			</CDropdownMenu>
		</CDropdown>
	);
}
