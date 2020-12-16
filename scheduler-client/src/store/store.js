import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import registerReducer from "../features/register/registerSlice";
import userEmailSettingsReducer from "../features/userSettings/userEmailSettingsSlice";
import userPasswordSettingsReducer from "../features/userSettings/userPasswordSettingsSlice";
import userArchiveSettingsReducer from "../features/userSettings/userArchiveSettingsSlice";
import userHeaderSettingsReducer from "../features/userSettings/userHeaderSettingsSlice";
import blocksReducer from "../features/blocks/blocksSlice";
import schedulerReducer from "../features/scheduler/schedulerSlice";
import schedulerHistoryReducer from "../features/schedulerHistory/schedulerHistorySlice";

export default configureStore({
    reducer: {
        auth : authReducer,
        register: registerReducer,
        userEmailSettings: userEmailSettingsReducer,
        userPasswordSettings: userPasswordSettingsReducer,
        userArchiveSettings: userArchiveSettingsReducer,
        userHeaderSettings: userHeaderSettingsReducer,
        blocks: blocksReducer,
        scheduler: schedulerReducer,
        schedulerHistory: schedulerHistoryReducer,
    },
});