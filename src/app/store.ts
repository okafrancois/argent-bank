import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import fetchSlice from '../features/fetch/fetch-slice';
import userReducer from '../features/user/user-slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        fetch: fetchSlice,
        user: userReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
