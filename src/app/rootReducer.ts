import { combineReducers } from '@reduxjs/toolkit';

import core from 'core/store/coreSlice';
import example from 'features/example/store/exampleSlice';

const rootReducer = combineReducers({
    core,
    example,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
