import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FetchState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'updating';
    error: string | null;
    data: any;
}

const initialState: FetchState = {
    status: 'idle',
    error: null,
    data: null,
}

const fetchSlice = createSlice({
    name: 'fetch',
    initialState,
    reducers: {
        fetchStart(state) {
            if (state.status === 'idle') {
                state.status = 'loading';
            }

            if (state.status === 'succeeded') {
                state.status = 'updating';
            }

            if (state.status === 'failed') {
                state.status = 'loading';
            }
        },
        fetchSuccess(state, action: PayloadAction<any>) {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        fetchError(state, action: PayloadAction<string>) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
})

export const { fetchStart, fetchSuccess, fetchError } = fetchSlice.actions;
export default fetchSlice.reducer;
