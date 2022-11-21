import React, {useState, useEffect} from 'react';
import Diceboard from './Diceboard';
import TotalRoll from './TotalRoll';
import DiceAdder from './DiceAdder';
import CombinationList from './CombinationList';
import getRandomInt from '../utils';

const Diceroller = () => {
    const [dice, setDice] = useState([6]);
    const [diceRolls, setDiceRolls] = useState([1]);
    const [total, setTotal] = useState(1);
    const [combinations, setCombinations] = useState([]);

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
    };

    const onLoadClick = (e) => {
        const loadedDice = e.target.parentNode.firstChild.dataset.value;
        const loadedDiceArr = loadedDice.split("+").map((num) => {
            return parseInt(num);
        });
        const loadedDiceRolls = rollDice(loadedDiceArr);
        setDice(loadedDiceArr);
        setDiceRolls(loadedDiceRolls);
        setTotal(loadedDiceRolls.reduce((a,b) => a + b, 0))
    }

    const onDeleteClick = (e) => {
        const toDelete = e.target.parentNode.firstChild.dataset.value;
        const toDeleteArr = toDelete.split("+").map((num) => {
            return parseInt(num);
        });
        const newCombs = combinations.filter((comb) => comb.toString() !== toDeleteArr.toString())
        console.log(newCombs);
    };

    const onSaveClick = (e) => {
        if(!combinations.includes(dice)){
            setCombinations(combinations => [...combinations, dice]);
        }else{
            alert("Combination already saved.");
        }
    };

    return (
        <div>
            <div id='side'>
                <CombinationList combinations={combinations} onLoadClick={onLoadClick} onDeleteClick={onDeleteClick}/>
            </div>
            <div id='main'>
                <DiceAdder onAddClick={onAddClick}/>
                <Diceboard dice={dice} values={diceRolls}/>
                <TotalRoll total={total}/>
                <button onClick={onRollClick}>Roll</button>
                <button onClick={onSaveClick}>Save</button>
            </div>
        </div>
    );
};

export default Diceroller;