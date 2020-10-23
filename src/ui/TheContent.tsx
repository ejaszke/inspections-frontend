import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { CContainer } from '@coreui/react';

// routes config
import routes from '../routes';
import PrivateRoute from '../app/PrivateRoute';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse" />
    </div>
);

const TheContent = () => {
    return (
        <main className="c-main">
            <CContainer fluid>
                <Suspense fallback={loading}>
                    <Switch>
                        {routes.map((route, idx) => (
                            <PrivateRoute key={idx} exact={route.exact} path={route.path} component={route.component} />
                        ))}
                        <Redirect from="/" to="/product-group" />
                    </Switch>
                </Suspense>
            </CContainer>
        </main>
    );
};

export default React.memo(TheContent);
