import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isSignedIn?: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, isSignedIn, ...children } = props;
    const token = useSelector((state: RootState) => state.user.token);

    return (
        <Route
            {...children}
            render={(routeProps) => (!!token ? Component && <Component {...routeProps} /> : <Redirect to="/login" />)}
        />
    );
};
export default PrivateRoute;
