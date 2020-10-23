/*eslint-disable */
import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { UserContext } from '../features/user/UserProvider';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...children }) => {
    const { user } = useContext(UserContext);

    return (
        <Route
            {...children}
            render={(routeProps) => (!!user ? Component && <Component {...routeProps} /> : <Redirect to="/login" />)}
        />
    );
};
export default PrivateRoute;
