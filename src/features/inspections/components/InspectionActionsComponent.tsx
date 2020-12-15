import React from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import store from '../../../app/store';
import { Inspection } from '../model/inspection';
import { setDeleteDialogOpen } from '../store/inspectionSlice';

export default function InspectionActionsComponent(cell: string, inspection: Inspection) {
    const { dispatch } = store;

    const handleDeleteInspection = () => {
        dispatch(setDeleteDialogOpen(true, inspection));
    };

    return (
        <CDropdown className="m-1 d-inline-block">
            <CDropdownToggle color="secondary">Opcje</CDropdownToggle>
            <CDropdownMenu placement="bottom">
                <CDropdownItem href={`#/inspections/all/edit/${inspection.id}`}>Edytuj</CDropdownItem>
                <CDropdownItem onClick={handleDeleteInspection}>Usuń</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
}
