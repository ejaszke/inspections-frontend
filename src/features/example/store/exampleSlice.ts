import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'app/store';
import { Example } from '../model/example';
import { PageInfo } from '../../shared/model/pageInfo';
import { ExampleApi } from '../../../api/exampleApi';
import * as Sentry from '@sentry/react';
import { toast } from 'react-toastify';
import { ExampleFilters } from '../model/exampleFilters';

interface ExampleState {
    productGroups: PageInfo<Example>;
    editedData: Example | null;
    deleteData: Example | null;
    isRegisterDialogOpen: boolean;
    isEditDialogOpen: boolean;
    isDeleteDialogOpen: boolean;
}

const initialState: ExampleState = {
    productGroups: {
        total: 0,
        limit: 0,
        skip: 0,
        sortOrder: 'asc',
        sortField: 'name',
        data: [],
    },
    editedData: null,
    deleteData: null,
    isRegisterDialogOpen: false,
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
};

const exampleSlice = createSlice({
    name: 'productGroups',
    initialState,
    reducers: {
        receiveProductGroupsSuccess(state, action: PayloadAction<PageInfo<Example>>) {
            return {
                ...state,
                productGroups: {
                    ...state.productGroups,
                    ...action.payload,
                },
            };
        },
        editProductGroupSuccess(state, action: PayloadAction<Example>) {
            return {
                ...state,
                productGroups: {
                    ...state.productGroups,
                    data: state.productGroups.data.map((pg) => (pg.id === action.payload.id ? action.payload : pg)),
                },
                editedData: null,
                isEditDialogOpen: false,
            };
        },
        setEditDialogOpen(state, action: PayloadAction<{ isOpen: boolean; productGroup: Example | null }>) {
            return { ...state, isEditDialogOpen: action.payload.isOpen, editedData: action.payload.productGroup };
        },
        setRegisterDialogOpen(state, action: PayloadAction<boolean>) {
            return { ...state, isRegisterDialogOpen: action.payload };
        },
        setDeleteDialogOpen(state, action: PayloadAction<{ isOpen: boolean; productGroup: Example | null }>) {
            return { ...state, isDeleteDialogOpen: action.payload.isOpen, deleteData: action.payload.productGroup };
        },
    },
});

export const loadProductGroups = (filters: ExampleFilters): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const result = await ExampleApi.fetchExample(filters);
        dispatch(
            exampleSlice.actions.receiveProductGroupsSuccess({
                ...result,
                sortField: filters.sortField,
                sortOrder: filters.sortOrder,
            }),
        );
    } catch (e) {
        toast.error('Wystąpił problem z pobraniem listy');
        Sentry.captureException(e);
    }
};

// export const editProductGroup = (id: string, name: string, group: string): AppThunk => async (
//     dispatch: AppDispatch,
// ) => {
//     try {
//         const result = await ExampleApi.fetchEditProductGroup(id, name, group);
//         dispatch(exampleSlice.actions.editProductGroupSuccess(result));
//         toast.success('Grupa produktów została zaktualizowana');
//     } catch (e) {
//         Sentry.captureException(e);
//         toast.error('Wystąpił problem');
//     }
// };
//
// export const deleteProductGroup = (id: string): AppThunk => async (
//     dispatch: AppDispatch,
//     getState: () => RootState,
// ) => {
//     try {
//         const { limit, skip, sortOrder, sortField } = getState().example.productGroups;
//         await ExampleApi.fetchDeleteProductGroup(id);
//         dispatch(loadProductGroups({ limit, skip, sortOrder, sortField }));
//         dispatch(setDeleteDialogOpen(false, null));
//         toast.success('Grupa produktów została usunięta');
//     } catch (e) {
//         Sentry.captureException(e);
//         toast.error('Wystąpił problem');
//     }
// };
//
// export const registerProductGroup = (name: string, group: string): AppThunk => async (
//     dispatch: AppDispatch,
//     getState: () => RootState,
// ) => {
//     try {
//         const { limit, skip, sortOrder, sortField } = getState().example.productGroups;
//         await ExampleApi.fetchRegisterProductGroup(name, group);
//         dispatch(setRegisterDialogOpen(false));
//         dispatch(loadProductGroups({ limit, skip, sortOrder, sortField }));
//         toast.success('Grupa produktów została dodana');
//     } catch (e) {
//         Sentry.captureException(e);
//         toast.error('Wystąpił problem');
//     }
// };

export const setDeleteDialogOpen = (isOpen: boolean, productGroup: Example | null) => (dispatch: AppDispatch) => {
    dispatch(exampleSlice.actions.setDeleteDialogOpen({ isOpen, productGroup }));
};

export const setEditDialogOpen = (isOpen: boolean, productGroup: Example | null) => (dispatch: AppDispatch) => {
    dispatch(exampleSlice.actions.setEditDialogOpen({ isOpen, productGroup }));
};

export const setRegisterDialogOpen = (isOpen: boolean) => (dispatch: AppDispatch) => {
    dispatch(exampleSlice.actions.setRegisterDialogOpen(isOpen));
};

export default exampleSlice.reducer;
