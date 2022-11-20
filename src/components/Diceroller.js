import React, {useState, useEffect} from 'react';
import Diceboard from './Diceboard';
import getRandomInt from '../utils';

const Diceroller = () => {
    const [dice, setDice] = useState([6]);
    const [diceRolls, setDiceRolls] = useState([1]);
    const [total, setTotal] = useState(1);
    
    const rollDice = (dice) => {
        return dice.map((die) => {
            return getRandomInt(die);
        });
    };

    const onRollClick = (e) => {
        setDiceRolls(rollDice(dice));
        setTotal(diceRolls.reduce((a,b) => a + b, 0));
    };

    const onAddClick = (e) => {
        const newDice = e.target.value;
        setDice(dice => [...dice, newDice]);
        const newDiceRoll = getRandomInt(newDice);
        setDiceRolls(diceRolls => [...diceRolls, newDiceRoll]);
        setTotal(total + newDiceRoll);
    }

};

export default Diceroller;