/*eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './app/store';
import './index.scss';
import App from './app/App';

import { icons } from './assets/icons';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import AuthHandlerContainer from './features/shared/containers/AuthHandlerContainer';

// @ts-ignore
React.icons = icons;

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <ToastContainer />
            <AuthHandlerContainer/>
            <App />
        </Provider>,
        document.getElementById('root'),
    );
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/App', render);
}
