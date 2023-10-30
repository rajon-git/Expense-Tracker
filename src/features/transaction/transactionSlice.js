import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionApi"

const initialState= {
    transactions:[],
    isLoading:false,
    isError:false,
    error:""
}

//all transactions thunk
export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions',async()=>{
    const transactions = await getTransactions();
    return transactions;
})

//add transactions thunk 
export const createTransactions = createAsyncThunk('transaction/createTransaction',async(data)=>{
    const transaction = await addTransaction(data);
    return transaction;
})

//edit transactions thunk 
export const changeTransaction = createAsyncThunk('transaction/changeTransaction',async({id,data})=>{
    const transaction = await editTransaction(id,data);
    return transaction;
})

//delete transactions thunk 
export const removeTransaction = createAsyncThunk('transaction/removeTransaction',async(id)=>{
    const transaction = await deleteTransaction(id);
    return transaction;
})


//create slice

const transactionSlice = createSlice({
    name:'transction',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTransactions.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
        })
        .addCase(fetchTransactions.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.transactions = action.payload;  //receive data from server
        })
        .addCase(fetchTransactions.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
            state.transactions = []
        })

        .addCase(createTransactions.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
        })
        .addCase(createTransactions.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.transactions.push(action.payload);  //receive data from server
        })
        .addCase(createTransactions.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        .addCase(changeTransaction.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
        })
        .addCase(changeTransaction.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            const indexToUpdate =state.transactions.findIndex(t=> t.id === action.payload.id);  // find id 
            state.transactions[indexToUpdate] = action.payload;  //update 
        })
        .addCase(changeTransaction.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
})