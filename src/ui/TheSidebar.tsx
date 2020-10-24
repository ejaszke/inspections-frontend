import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
} from '@coreui/react';

// sidebar nav config
import navigation from './_nav';
import { RootState } from '../app/rootReducer';

const TheSidebar = () => {
    const dispatch = useDispatch();
    const show = useSelector((state: RootState) => state.core.sidebarShow);

    return (
        <CSidebar show={show} onShowChange={(val: boolean) => dispatch({ type: 'set', sidebarShow: val })}>
            <CSidebarBrand className="d-md-down-none" to="/">
                <h5 style={{ color: 'white', paddingTop: '11px' }}>Inspekcje</h5>
            </CSidebarBrand>
            <CSidebarNav>
                <CCreateElement
                    items={navigation}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle,
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
    );
};

export default React.memo(TheSidebar);
