import React, { useState, useEffect } from 'react';
import './style.css'; // Import the CSS file
import Balance from './Balance';
import IncomeExpense from './IncomeExpense';
import TransactionHistory from './TransactionHistory';
import AddTransactionForm from './AddTransactionForm';

const ExpenseTrackerApp = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const localStorageTransactions = JSON.parse(
      localStorage.getItem('transactions')
    );

    if (localStorageTransactions) {
      setTransactions(localStorageTransactions);
    }
  }, []);

  const addTransaction = (text, amount) => {
    if (text.trim() === '' || amount.trim() === '') {
      alert('Please add a text and amount');
    } else {
      const transaction = {
        id: generateID(),
        text,
        amount: +amount,
      };

      setTransactions([...transactions, transaction]);
    }
  };

  const generateID = () => {
    return Math.floor(Math.random() * 100000000);
  };

  const removeTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const updateValues = () => {
    const amounts = transactions.map((transaction) => transaction.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => acc + item, 0)
      .toFixed(2);
    const expense = (
      amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) *
      -1
    ).toFixed(2);

    return { total, income, expense };
  };

  return (
    <div>
      <header>
        <h2>Expense Tracker</h2>
      </header>

      <div className="container">
        <Balance total={updateValues().total} />
        <IncomeExpense
          income={updateValues().income}
          expense={updateValues().expense}
        />
        <TransactionHistory
          transactions={transactions}
          removeTransaction={removeTransaction}
        />
        <AddTransactionForm addTransaction={addTransaction} />
      </div>
    </div>
  );
};

export default ExpenseTrackerApp;
