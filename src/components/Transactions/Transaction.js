import React from 'react';
import deleteImg from "../../assets/images/delete.svg"
import editImg from "../../assets/images/edit.svg"
import { useDispatch } from 'react-redux';
import { editActive, removeTransaction } from '../../features/transaction/transactionSlice';

const Transaction = ({transaction}) => {
  const {name,type,amount,id}=transaction;
  const dispatch= useDispatch();

  const handleEdit =()=>{
    dispatch(editActive(transaction))
  }

  const handleDelete =()=>{
    dispatch(removeTransaction(id))
  }
    return (
        <div>
            <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
              <p>৳ {amount}</p>
              <button className="link" onClick={handleEdit}>
                <img alt="edit" className="icon" src={editImg} />
              </button>
              <button className="link" onClick={handleDelete}>
                <img alt="delete" className="icon" src={deleteImg} />
              </button>
            </div>
          </li>
        </div>
    );
};

export default Transaction;