import React from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { Example } from '../model/example';
import { setEditDialogOpen, setDeleteDialogOpen } from '../store/exampleSlice';
import store from '../../../app/store';

export default function ExampleActionsComponent(cell: string, productGroup: Example) {
    const { dispatch } = store;

    const handleEditData = () => {
        dispatch(setEditDialogOpen(true, productGroup));
    };

    const handleDeleteProductGroup = () => {
        dispatch(setDeleteDialogOpen(true, productGroup));
    };

    return (
        <CDropdown className="m-1 d-inline-block">
            <CDropdownToggle color="secondary">Opcje</CDropdownToggle>
            <CDropdownMenu placement="bottom">
                <CDropdownItem onClick={handleEditData}>Edytuj</CDropdownItem>
                <CDropdownItem onClick={handleDeleteProductGroup}>Usuń</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
}
