import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    balance: number | null;
}
export interface UserState {
    data: UserProfile;
    loading: boolean,
    error: string | null,
}

const initialState: UserState = {
    data: {
        email: null,
        firstName: null,
        lastName: null,
        balance: null,
    },
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserDataRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getUserDataSucceed(state, action: PayloadAction<UserProfile>) {
            state.data = {
                email : action.payload.email,
                firstName : action.payload.firstName,
                lastName : action.payload.lastName,
                balance : action.payload.balance,
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


export const { getUserDataRequest, getUserDataSucceed, getUserDataFailed } = userSlice.actions;
export default userSlice.reducer;
