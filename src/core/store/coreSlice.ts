import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoreState {
    sidebarShow: '' | true | false | 'responsive';
}

const initialState: CoreState = {
    sidebarShow: 'responsive',
};

const coreSlice = createSlice({
    name: 'core',
    initialState,
    reducers: {
        changeState(state, action: PayloadAction<'' | true | false | 'responsive'>) {
            return { ...state, sidebarShow: action.payload };
        },
    },
});

export const { changeState } = coreSlice.actions;

export default coreSlice.reducer;
