import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../user/store/userSlice';
import { toast } from 'react-toastify';

export default function AuthHandlerContainer() {
    const dispatch = useDispatch();

    const initResponseInterceptor = useCallback(() => {
        axios.interceptors.response.use(
            (response) => {
                return Promise.resolve(response);
            },
            (error) => {
                if (error.response.status === 401) {
                    toast.warn('Sesja wygasła');
                    dispatch(logout());
                }
                return Promise.reject(error);
            },
        );
    }, [dispatch]);

    useEffect(() => {
        initResponseInterceptor();
    }, [initResponseInterceptor]);

    return null;
}
