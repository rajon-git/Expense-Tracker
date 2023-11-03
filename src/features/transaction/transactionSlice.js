import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionApi"

const initialState= {
    transactions:[],
    isLoading:false,
    isError:false,
    error:"",
    editing:{}
}

//all transactions thunk
export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions',async()=>{
    const transactions = await getTransactions();
    return transactions;
})

//add transactions thunk 
export const createTransaction = createAsyncThunk('transaction/createTransaction',async(data)=>{
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
    name:'transaction',
    initialState,
    reducers: {
        editActive: (state,action)=>{
            state.editing = action.payload
        },
        editInActive: (state)=>{
            state.editing = {};
        }
    },
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

        .addCase(createTransaction.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
        })
        .addCase(createTransaction.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.transactions.push(action.payload);  //receive data from server
        })
        .addCase(createTransaction.rejected,(state,action)=>{
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
            const indexToUpdate =state.transactions.findIndex((t)=> t.id === action.payload.id);  // find id 
            state.transactions[indexToUpdate] = action.payload;  //update 
        })
        .addCase(changeTransaction.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        .addCase(removeTransaction.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
        })
        .addCase(removeTransaction.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.transactions= state.transactions.filter(
                (t)=> t.id !== action.payload
            );  //delete 
        })
        .addCase(removeTransaction.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
})

export default transactionSlice.reducer;
export const {editActive,editInActive}=transactionSlice.actions;
