import React from 'react';
import './DiceAdder.css'

const DiceAdder = ({onAddClick}) => {
    const diceNumbers = [4, 6, 8, 10, 12, 20];
    const addButtons = diceNumbers.map((num) => {
        return <button key={num} onClick={onAddClick}>d{num}</button> 
    });

    return (
        <div id='diceadder'>
            {addButtons}
        </div>
    );
};

export default DiceAdder;