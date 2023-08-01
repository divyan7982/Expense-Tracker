import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addTransaction = (e) => {
    e.preventDefault();

    if (text.trim() === '' || amount.trim() === '') {
      alert('Please add a description and amount');
    } else {
      const newTransaction = {
        id: generateID(),
        text,
        amount: +amount,
      };

      setTransactions([...transactions, newTransaction]);
      setText('');
      setAmount('');
    }
  };

  const handleRemoveTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  const generateID = () => {
    return Math.floor(Math.random() * 100000000);
  };

  const total = transactions
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);
  const expense = (
    transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0) * -1
  ).toFixed(2);

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Expense Tracker</h1>
      <div className="balance">
        <h2>
          Balance: <span>${total}</span>
        </h2>
        <div className="income-expense">
          <div>
            <h3>Income</h3>
            <p>+${income}</p>
          </div>
          <div>
            <h3>Expense</h3>
            <p>-${expense}</p>
          </div>
        </div>
      </div>
      <form onSubmit={addTransaction}>
        <div className="form-control">
          <label htmlFor="text">Description</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter description..."
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
      <ul className="list">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={transaction.amount >= 0 ? 'plus' : 'minus'}
          >
            {transaction.description}
            <span className="money">{transaction.amount}</span>
            <button
              className="delete-btn"
              onClick={() => handleRemoveTransaction(transaction.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default App;
