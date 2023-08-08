import React from 'react';

const Balance = ({ total }) => {
  const formattedTotal = typeof total === 'number' ? total.toFixed(2) : total;

  return (
    <div>
      <h4>Your Balance</h4>
      <h1>${formattedTotal}</h1>
    </div>
  );
};

export default Balance;
