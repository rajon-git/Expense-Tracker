import React from 'react';
import deleteImg from "../../assets/images/delete.svg"
import editImg from "../../assets/images/edit.svg"

const Transaction = ({transaction}) => {
  const {name,type,amount}=transaction;
    return (
        <div>
            <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
              <p>৳ {amount}</p>
              <button className="link">
                <img alt="edit" className="icon" src={editImg} />
              </button>
              <button className="link">
                <img alt="delete" className="icon" src={deleteImg} />
              </button>
            </div>
          </li>
        </div>
    );
};

export default Transaction;