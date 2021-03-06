import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'app/store';
import { InspectionTime } from '../model/inspectionTime';
import { toast } from 'react-toastify';
import { InspectionTimeApi } from '../../../../api/inspectionTimeApi';
import { RootState } from '../../../../app/rootReducer';
import { loadInspectionById } from '../../store/inspectionSlice';

interface InspectionTimeState {
    isRegisterDialogOpen: boolean;
    editedData: InspectionTime | null;
    deleteData: InspectionTime | null;
    isDeleteDialogOpen: boolean;
    isEditDialogOpen: boolean;
}

const initialState: InspectionTimeState = {
    isRegisterDialogOpen: false,
    editedData: null,
    deleteData: null,
    isDeleteDialogOpen: false,
    isEditDialogOpen: false,
};

const inspectionTimeSlice = createSlice({
    name: 'inspectionTime',
    initialState,
    reducers: {
        setRegisterDialogOpen(state, action: PayloadAction<boolean>) {
            return { ...state, isRegisterDialogOpen: action.payload };
        },
        setDeleteDialogOpen(state, action: PayloadAction<{ isOpen: boolean; inspectionTime: InspectionTime | null }>) {
            return { ...state, isDeleteDialogOpen: action.payload.isOpen, deleteData: action.payload.inspectionTime };
        },
        setEditDialogOpen(state, action: PayloadAction<{ isOpen: boolean; inspectionTime: InspectionTime | null }>) {
            return { ...state, isEditDialogOpen: action.payload.isOpen, editedData: action.payload.inspectionTime };
        },
    },
});

export const registerInspectionTime = (inspectionId: string, inspectionTime: InspectionTime): AppThunk => async (
    dispatch: AppDispatch,
    getState: () => RootState,
) => {
    try {
        await InspectionTimeApi.fetchRegisterInspectionTime(inspectionId, inspectionTime);
        const edited = getState().inspections.updatedInspection;
        if (edited && edited.id) {
            dispatch(loadInspectionById(edited.id));
        }
        dispatch(setRegisterDialogOpen(false));
        toast.success('Dodano czas inspekcji');
    } catch (e) {
        if (e.response.status !== 401) {
            toast.error('Wystąpił problem z zapisem');
        }
    }
};

export const editInspectionTime = (
    inspectionId: string,
    inspectionTimeId: string,
    inspectionTime: InspectionTime,
): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        await InspectionTimeApi.fetchEditInspectionTime(inspectionId, inspectionTimeId, inspectionTime);
        const editedData = getState().inspections.updatedInspection;
        if (editedData && editedData.id) {
            dispatch(loadInspectionById(editedData.id));
        }
        dispatch(setEditDialogOpen(false, null));
    } catch (e) {
        if (e.response.status !== 401) {
            toast.error('Wystąpił problem z zapisem');
        }
    }
};

export const deleteInspectionTime = (inspectionId: string, inspectionTimeId: string): AppThunk => async (
    dispatch: AppDispatch,
    getState: () => RootState,
) => {
    try {
        await InspectionTimeApi.fetchDeleteInspectionTime(inspectionId, inspectionTimeId);
        const edited = getState().inspections.updatedInspection;
        if (edited && edited.id) {
            dispatch(loadInspectionById(edited.id));
        }
        dispatch(setDeleteDialogOpen(false, null));
    } catch (e) {
        if (e.response.status !== 401) {
            toast.error('Wystąpił problem z usunięciem');
        }
    }
};

export const setRegisterDialogOpen = (isOpen: boolean) => (dispatch: AppDispatch) => {
    dispatch(inspectionTimeSlice.actions.setRegisterDialogOpen(isOpen));
};

export const setDeleteDialogOpen = (isOpen: boolean, inspectionTime: InspectionTime | null) => (
    dispatch: AppDispatch,
) => {
    dispatch(inspectionTimeSlice.actions.setDeleteDialogOpen({ isOpen, inspectionTime }));
};

export const setEditDialogOpen = (isOpen: boolean, inspectionTime: InspectionTime | null) => (
    dispatch: AppDispatch,
) => {
    dispatch(inspectionTimeSlice.actions.setEditDialogOpen({ isOpen, inspectionTime }));
};

export default inspectionTimeSlice.reducer;
