import React, { useState } from 'react';

const AddTransactionForm = ({ addTransaction }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(text, amount);
    setText('');
    setAmount('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text"><b>Add New Transaction</b></label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Description..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount"><b>Amount</b></label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn" type="submit">
          Add transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
