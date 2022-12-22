import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    data: {
        id: string | null;
        email: string | null;
        firstName: string | null;
        lastName: string | null;
    };
    loading: boolean,
    error: string | null,
}

const initialState: UserState = {
    data: {
        id: null,
        email: null,
        firstName: null,
        lastName: null,
    },
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        gettingUserData(state) {
            state.loading = true;
            state.error = null;
        },
        getUserDataSucceed(state, action: PayloadAction<{id: string, email: string, firstName: string, lastName: string}>) {
            state.data = {
                id : action.payload.id,
                email : action.payload.email,
                firstName : action.payload.firstName,
                lastName : action.payload.lastName,
            }
            state.loading = false;
            state.error = null;
        },
        getUserDataFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export const { gettingUserData, getUserDataSucceed, getUserDataFailed } = userSlice.actions;
export default userSlice.reducer;
