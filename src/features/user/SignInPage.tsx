/* eslint-disable */
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import { UserContext } from './UserProvider';

export default function SignIn() {
    const { user } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            console.log('to be implemented');
        },
    });

    if (user) {
        return <Redirect to="/orders" />;
    }

    return <p>Logowanie</p>;
}
