import React from 'react';

const DiceAdder = ({onAddClick}) => {
    const diceNumbers = [4, 6, 8, 10, 12, 20];
    const addButtons = diceNumbers.map((num) => {
        return <button key={num} onClick={onAddClick}>d{num}</button> 
    });

    return (
        <div>
            {addButtons}
        </div>
    );
};

export default DiceAdder;