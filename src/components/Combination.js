import React from "react";
import './Combination.css';

const Combination = ({dice, onLoadClick, onDeleteClick}) => {
    const diceCounts = {};
    const diceStr = dice.join('+');

    for(const num of dice){
        diceCounts[num] = diceCounts[num] ? diceCounts[num] + 1 : 1;
    }

    const comb = Object.keys(diceCounts).reduce((previous, key) => {
        return `${previous} + ${diceCounts[key]}d${key}`
    });

    return (
        <div className='combination'>
            <span className="combStr" data-value={diceStr}>{comb}</span>
            <div className="loadAndDelete">
                <button className='load' onClick={onLoadClick}>Load</button>
                <button className="delete" onClick={onDeleteClick}>Delete</button>
            </div>
        </div>
    );
};

export default Combination;