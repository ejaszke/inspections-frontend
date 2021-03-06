import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import SignInPage from '../features/user/components/SignInPageComponent';
import Layout from '../ui/Layout';
import * as Sentry from '@sentry/react';
import PrivateRoute from './PrivateRoute';
import { AppRoutePath } from './appRoutePath';
import ConfirmationFormComponent from '../features/confirmations/components/ConfirmationFormComponent';

Sentry.init({
    // dsn: 'https://f7044d790fd54897a07b7cc2a45f532d@o156945.ingest.sentry.io/5425674',
});

function App() {
    return (
        <HashRouter basename={AppRoutePath.base}>
            <div className="App">
                <Switch>
                    <Route exact path={AppRoutePath.login} component={SignInPage} />
                    <Route exact path={AppRoutePath.confirmationAdd} component={ConfirmationFormComponent} />
                    <PrivateRoute path="/" component={Layout} />
                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
