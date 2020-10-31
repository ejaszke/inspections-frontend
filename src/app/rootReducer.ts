import { combineReducers } from '@reduxjs/toolkit';
import core from 'core/store/coreSlice';
import example from 'features/example/store/exampleSlice';
import user from 'features/user/store/userSlice'

const rootReducer = combineReducers({
    core,
    example,
    user
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
