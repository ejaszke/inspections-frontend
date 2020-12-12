import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'app/store';
import { User } from '../model/user';
import { Token } from '../model/token';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/react';
import { Credentials } from '../model/credentials';
import history from '../../../app/services/history';
import { UserApi } from '../../../api/userApi';
import { axiosInstance } from '../../../api/base';

const token = localStorage.getItem('session');
const storedToken: Token = token ? JSON.parse(token) : null;

interface UserState {
    user: User | null;
    token: Token | null;
}

const initialState: UserState = {
    user: null,
    token: storedToken ? storedToken : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<Token>) {
            return {
                ...state,
                token: action.payload,
            };
        },
        logoutSuccess(state, action) {
            return {
                ...state,
                token: action.payload,
            };
        },
    },
});

export const login = (credentials: Credentials): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const result = await UserApi.loginUser(credentials);
        dispatch(userSlice.actions.loginSuccess(result.data));
        saveToken(result.data);
        history.push('/inspections/all');
    } catch (e) {
        if (e.response.status === 400) {
            toast.warn('Nieprawidłowy email lub hasło');
        } else {
            toast.error('Wystąpił problem');
        }
        Sentry.captureException(e);
    }
};

export const logout = () => (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.logoutSuccess(null));
        localStorage.removeItem('session');
    } catch (e) {
        if (e.response.status !== 401) {
            toast.error('Wystąpił problem');
            Sentry.captureException(e);
        }
    }
};

export default userSlice.reducer;

const saveToken = (token: Token) => {
    const session = {
        access_token: token.access_token,
    };
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
    localStorage.setItem('session', JSON.stringify(session));
};
