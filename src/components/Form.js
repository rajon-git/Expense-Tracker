import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../features/transaction/transactionSlice";

const Form = () => {
  const [name,setName]=useState('');
  const [type,setType]=useState('');
  const [amount,setAmount]=useState('');
  const dispatch = useDispatch()
  const {isLoading,isError,error} = useSelector(state => state.transaction)

  const handleCreate =(e)=>{
    e.preventDefault()
    dispatch(createTransaction({
      name,
      type,
      amount: Number(amount),
    }))
  }
  return (
    <div>
      <div className="form">
        <h3>Add new transaction</h3>
        <form onSubmit={handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input 
               type="text" 
               name="name"
               required 
               placeholder="Enter sallary" 
               value={name}
               onChange={(e)=> setName(e.target.value)}/>
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              required
              value="income"
              name="type"
              checked = {type === 'income'}
              onChange={(e)=> setType('income')}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked = {type === 'expense'}
              onChange={(e)=> setType('expense')}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input 
               type="number" 
               required
               placeholder="Enter amount" 
               name="amount" 
               value={amount}
               onChange={(e)=> setAmount(e.target.value)}/>
        </div>

        <button disabled={isLoading} className="btn" type="submit">Add Transaction</button>

        {!isLoading && isError && <p className="error">There was an error occured</p>}
        </form>

        <button className="btn cancel_edit">Cancel Edit</button>
      </div>
    </div>
  );
};

export default Form;
