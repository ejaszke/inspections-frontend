import { combineReducers } from '@reduxjs/toolkit';
import core from 'core/store/coreSlice';
import example from 'features/example/store/exampleSlice';
import user from 'features/user/store/userSlice';
import inspections from 'features/inspections/store/inspectionSlice';
import inspectionTimes from 'features/inspections/times/store/inspectionTimeSlice';

const rootReducer = combineReducers({
    core,
    example,
    user,
    inspections,
    inspectionTimes
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
