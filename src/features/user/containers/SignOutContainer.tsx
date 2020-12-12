import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';

export default function SingOutContainer() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    return null;
}
