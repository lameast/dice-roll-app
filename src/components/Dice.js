import React from 'react';

const Dice = ({value, max}) => {
    return (
      <div className={`d${max}`}>d{max} rolled: {value}</div>  
    );
};

export default Dice;