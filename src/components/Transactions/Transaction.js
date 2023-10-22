import React from 'react';
import deleteImg from "../../assets/images/delete.svg"
import editImg from "../../assets/images/edit.svg"

const Transaction = () => {
    return (
        <div>
            <li className="transaction income">
            <p>Earned this month</p>
            <div className="right">
              <p>৳ 100</p>
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