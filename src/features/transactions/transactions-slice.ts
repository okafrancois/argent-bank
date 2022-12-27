import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface Transaction {
    _id: string;
    userId: string;
    description: string;
    amount: number;
    balance: number;
    category: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
    "__v": number;
}
export interface TransactionsState {
    userTransaction: Transaction[] | [];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionsState = {
    userTransaction: [],
    loading: false,
    error: null,
}

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        getUserTransactionsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getUserTransactionsSucceed(state, action: PayloadAction<Transaction[]>) {
            state.userTransaction = action.payload;
            state.loading = false;
            state.error = null;
        },
        getUserTransactionsFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { getUserTransactionsRequest, getUserTransactionsFailed, getUserTransactionsSucceed } = transactionsSlice.actions;
export default transactionsSlice.reducer;
