import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CBreadcrumbRouter, CHeader, CSubheader, CToggler } from '@coreui/react';
// routes config
import routes from '../routes';
import { RootState } from '../app/rootReducer';
import { changeState } from 'core/store/coreSlice';

const TheHeader = () => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector((state: RootState) => state.core.sidebarShow);

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
        dispatch(changeState(val));
    };

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
        dispatch(changeState(val));
    };

    return (
        <CHeader withSubheader>
            <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
            <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />

            <CSubheader className="px-3 justify-content-between">
                <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
            </CSubheader>
        </CHeader>
    );
};

export default TheHeader;
