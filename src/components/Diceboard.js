import React from 'react';
import Dice from './Dice';
import uniqid from 'uniqid';
import './Diceboard.css';

const Diceboard = ({dice, values}) => {
    const diceBoard = dice.map((die, i) => {
        return <Dice key={uniqid()} max={die} value={values[i]}/>
    });

    return (
        <div id='diceboard'>
            {diceBoard}
        </div>
    );
};

export default Diceboard;