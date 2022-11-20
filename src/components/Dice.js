import React from 'react';

const Dice = (value) => {
    return (
      <div className={`d${value}`}>{value}</div>  
    );
};

export default Dice;