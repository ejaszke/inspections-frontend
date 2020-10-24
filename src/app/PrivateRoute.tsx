import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...children }) => {
    const token = useSelector((state: RootState) => state.user.token);

    return (
        <Route
            {...children}
            render={(routeProps) => (!!token ? Component && <Component {...routeProps} /> : <Redirect to="/login" />)}
        />
    );
};
export default PrivateRoute;
