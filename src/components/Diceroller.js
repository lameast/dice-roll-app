import React, {useState, useEffect} from 'react';
import Diceboard from './Diceboard';
import TotalRoll from './TotalRoll';
import DiceAdder from './DiceAdder';
import Dice from './Dice';
import CombinationList from './CombinationList';
import getRandomInt from '../utils';
import uniqid from 'uniqid';
import './Diceroller.css'

const Diceroller = () => {
    const [dice, setDice] = useState([]);
    const [diceRolls, setDiceRolls] = useState([]);
    const [total, setTotal] = useState(1);
    const [combinations, setCombinations] = useState([]);

    /*
    useEffect(() => {
        setTotal(total);
        setDiceRolls(diceRolls);
    }, [total, diceRolls]);
    */
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
        const newNum = parseInt(e.target.textContent.slice(1));
        const newDiceRoll = getRandomInt(newNum);
        const x = (dice.length)%8;
        const y = Math.floor((dice.length)/8);
        const newDice = <Dice key={uniqid()} max={newNum} value={newDiceRoll} position={[-8 + 2*x, 5 - 2*y,0]}/>
        setDice(dice => [...dice, newDice]);
        setDiceRolls(diceRolls => [...diceRolls, newDiceRoll]);
        setTotal(total + newDiceRoll);
    };

    const onLoadClick = (e) => {
        const loadedDice = e.target.parentNode.parentNode.firstChild.dataset.value;
        const loadedDiceArr = loadedDice.split("+").map((num) => {
            return parseInt(num);
        });
        const loadedDiceRolls = rollDice(loadedDiceArr);
        setDice(loadedDiceArr);
        setDiceRolls(loadedDiceRolls);
        setTotal(loadedDiceRolls.reduce((a,b) => a + b, 0))
    }

    const onDeleteClick = (e) => {
        const toDelete = e.target.parentNode.parentNode.firstChild.dataset.value;
        const toDeleteArr = toDelete.split("+").map((num) => {
            return parseInt(num);
        });
        const newCombs = combinations.filter((comb) => comb.toString() !== toDeleteArr.toString())
        setCombinations(newCombs);
    };

    const onSaveClick = (e) => {
        if(!combinations.includes(dice)){
            setCombinations(combinations => [...combinations, dice]);
        }else{
            alert("Combination already saved.");
        }
    };

    const onResetClick = (e) => {
        setDice([]);
        setDiceRolls([]);
        setTotal(0);
    }

    return (
        <div id='diceroller'>
            <div id='side'>
                <CombinationList combinations={combinations} onLoadClick={onLoadClick} onDeleteClick={onDeleteClick}/>
            </div>
            <div id='main'>
                <DiceAdder onAddClick={onAddClick}/>
                <Diceboard dice={dice} values={diceRolls}/>
                <TotalRoll total={total}/>
                <div id='options'>
                    <button id='roll' onClick={onRollClick}>Roll</button>
                    <button id='save' onClick={onSaveClick}>Save</button>
                    <button id='reset' onClick={onResetClick}>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default Diceroller;