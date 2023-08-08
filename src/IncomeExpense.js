import React from 'react';

const IncomeExpense = ({ income, expense }) => {
  const formattedIncome =
    typeof income === 'number' ? income.toFixed(2) : income;
  const formattedExpense =
    typeof expense === 'number' ? expense.toFixed(2) : expense;

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+${formattedIncome}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-${formattedExpense}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
