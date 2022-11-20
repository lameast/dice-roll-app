import React, {useState, useEffect} from 'react';
import Diceboard from './Diceboard';
import TotalRoll from './TotalRoll';
import DiceAdder from './DiceAdder';
import getRandomInt from '../utils';

const Diceroller = () => {
    const [dice, setDice] = useState([6]);
    const [diceRolls, setDiceRolls] = useState([1]);
    const [total, setTotal] = useState(1);

    useEffect(() => {
        setTotal(total);
        setDiceRolls(diceRolls);
    }, [total, diceRolls]);

    const rollDice = (dice) => {
        return dice.map((die) => {
            return getRandomInt(die);
        });
    };

    const onRollClick = (e) => {
        const newRoll = rollDice(dice);
        setDiceRolls(newRoll);
        setTotal(newRoll.reduce((a,b) => a + b, 0));
    };

    const onAddClick = (e) => {
        const newDice = parseInt(e.target.textContent.slice(1));
        setDice(dice => [...dice, newDice]);
        const newDiceRoll = getRandomInt(newDice);
        setDiceRolls(diceRolls => [...diceRolls, newDiceRoll]);
        setTotal(total + newDiceRoll);
    }

    return (
        <div>
            <DiceAdder onAddClick={onAddClick}/>
            <Diceboard dice={dice} values={diceRolls}/>
            <TotalRoll total={total}/>
            <button onClick={onRollClick}>Roll</button>
        </div>
    );
};

export default Diceroller;