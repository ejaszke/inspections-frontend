import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'app/store';
import { Inspection } from '../model/inspection';
import { toast } from 'react-toastify';
import { InspectionApi } from '../../../api/inspectionApi';
import history from '../../../app/services/history';

interface InspectionsState {
	inspections: Inspection[]
	isRegisterDialogOpen: boolean;
	editedData: Inspection | null;
	deleteData: Inspection | null;
	isDeleteDialogOpen: boolean;
}

const initialState: InspectionsState = {
	inspections: [],
	isRegisterDialogOpen: false,
	editedData: null,
	deleteData: null,
	isDeleteDialogOpen: false,
};

const inspectionSlice = createSlice({
	name: 'inspections',
	initialState,
	reducers: {
		receiveInspections(state, action: PayloadAction<Inspection[]>) {
			return {
				...state,
				inspections: action.payload,
			}
		},
		receiveInspection(state, action: PayloadAction<Inspection>) {
			return {
				...state,
				editedData: action.payload,
			}
		},
		editInspectionSuccess(state, action: PayloadAction<Inspection>) {
			return {
				...state,
				inspections: {
					...state.inspections,
					...state.inspections.map(inspection => inspection.id === action.payload.id ? action.payload : inspection)
				}
			}
		},
		setEditedData(state, action: PayloadAction<{inspection: Inspection | null}>) {
			return {...state, editedData: action.payload.inspection};
		},
		setRegisterDialogOpen(state, action: PayloadAction<boolean>) {
			return {...state, isRegisterDialogOpen: action.payload};
		},
		setDeleteDialogOpen(state, action: PayloadAction<{isOpen: boolean; inspection: Inspection | null}>) {
			return {...state, isDeleteDialogOpen: action.payload.isOpen, deleteData: action.payload.inspection};
		},
	}
});

export const loadInspections = (): AppThunk => async (dispatch: AppDispatch) => {
	try {
		const result = await InspectionApi.fetchInspections();
		dispatch(inspectionSlice.actions.receiveInspections(result.data));
	} catch (e) {
		if (e.response.status !== 401) {
			toast.error('Wystąpił problem z pobraniem listy');
		}
	}
};

export const registerInspection = (inspection: Inspection): AppThunk => async (dispatch: AppDispatch) => {
	try {
		const result = await InspectionApi.fetchRegisterInspection(inspection);
		dispatch(setRegisterDialogOpen(false));
		dispatch(loadInspections());
		history.push(`/inspections/all/edit/${result.data.id}`);
		toast.success('Inspekcja dodana')
	} catch (e) {
		if (e.response.status !== 401) {
			toast.error('Wystąpił problem z zapisem');
		}
	}
};

export const editInspection = (id: string, inspection: Inspection): AppThunk => async (dispatch: AppDispatch) => {
	try {
		const result = await InspectionApi.fetchEditInspection(id, inspection);
		toast.success('Zapisano zmiany');
		dispatch(inspectionSlice.actions.editInspectionSuccess(result.data));
	} catch (e) {
		if (e.response) {
			if (e.response.status !== 401) {
				toast.error('Wystąpił problem z zapisem');
			}
		}
	}
};

export const loadInspectionById = (id: string): AppThunk => async (dispatch: AppDispatch) => {
	try {
		const result = await InspectionApi.fetchInspectionById(id);
		dispatch(inspectionSlice.actions.receiveInspection(result.data));
	} catch (e) {
		if (e.response.status !== 401) {
			toast.error('Wystąpił problem z pobraniem');
		}
	}
};

export const deleteInspection = (id: string): AppThunk => async (dispatch: AppDispatch) => {
	try {
		await InspectionApi.fetchDeleteInspection(id);
		dispatch(loadInspections());
		dispatch(setDeleteDialogOpen(false, null));
		toast.success('Inspekcja została usunięta');
	} catch (e) {
		if (e.response.status !== 401) {
			toast.error('Wystąpił problem');
		}
	}
};

export const setEditedData = (inspection: Inspection | null) => (dispatch: AppDispatch) => {
	dispatch(inspectionSlice.actions.setEditedData({inspection}));
};

export const setRegisterDialogOpen = (isOpen: boolean) => (dispatch: AppDispatch) => {
	dispatch(inspectionSlice.actions.setRegisterDialogOpen(isOpen));
};

export const setDeleteDialogOpen = (isOpen: boolean, inspection: Inspection | null) => (dispatch: AppDispatch) => {
	dispatch(inspectionSlice.actions.setDeleteDialogOpen({isOpen, inspection}));
};

export default inspectionSlice.reducer;
