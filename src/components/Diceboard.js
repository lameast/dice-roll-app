import React from 'react';
import Dice from './Dice';
import uniqid from 'uniqid';

const Diceboard = ({dice}) => {
    const diceBoard = dice.map((die) => {
        return <Dice key={uniqid()} value={die}/>
    });

    return (
        <div id='diceboard'>
            {diceBoard}
        </div>
    );
};

export default Diceboard;