import React, {useState, useEffect} from 'react';
import Diceboard from './Diceboard';
import getRandomInt from '../utils';

const Diceroller = () => {
    const [dice, setDice] = useState([6]);
    const [diceRolls, setDiceRolls] = useState([1]);
    
    const rollDice = (dice) => {
        return dice.map((die) => {
            return getRandomInt(die)
        });
    };

};

export default Diceroller;