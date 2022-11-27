import React, {useState} from 'react';
import Diceboard from './Diceboard';
import TotalRoll from './TotalRoll';
import DiceAdder from './DiceAdder';
import Dice from './Dice';
import CombinationList from './CombinationList';
import MaximumDice from './MaximumDice';
import Saved from './Saved';
import SaveNone from './SaveNone';
import {getRandomInt, isArrayInArray} from '../utils';
import uniqid from 'uniqid';
import './Diceroller.css'

const Diceroller = () => {
    const MAXIMUM = 48;
    const [dice, setDice] = useState([]);
    const [total, setTotal] = useState(0);
    const [combinations, setCombinations] = useState([]);
    const [overMax, setOverMax] = useState(false);
    const [alreadySaved, setAlreadySaved] = useState(false);
    const [saveNone, setSaveNone] = useState(false);

    const rollDice = (dice) => {
        return dice.map((die) => {
            return getRandomInt(die.props.max);
        });
    };

    //Roll dice that are currently on the board
    const onRollClick = (e) => {
        const newRoll = rollDice(dice);
        const newDice = dice.map((die, idx) => {
            return (<Dice key={uniqid()} max={die.props.max} value={newRoll[idx]} position={die.props.position}/>)
        });
        setDice(newDice);
        setTotal(newRoll.reduce((a,b) => a + b, 0));
    };

    //Add a dice to the board
    const onAddClick = (e) => {
        if(dice.length < MAXIMUM){
            const newNum = parseInt(e.target.textContent.slice(1));
            const newDiceRoll = getRandomInt(newNum);
            const x = (dice.length)%8;
            const y = Math.floor((dice.length)/8);
            const newDice = <Dice key={uniqid()} max={newNum} value={newDiceRoll} position={[-8 + 2*x, 5 - 2*y,0]}/>
            setDice(dice => [...dice, newDice]);
            setTotal(total + newDiceRoll);
        }else{
            setOverMax(true);
        }
    };

    //Load saved dice
    const onLoadClick = (e) => {
        const loadedDice = e.target.parentNode.parentNode.firstChild.dataset.value;
        const loadedDiceArr = loadedDice.split("+").map((num) => {
            return parseInt(num);
        });
        const loadedDiceRolls = loadedDiceArr.map((die) => {
            return getRandomInt(die);
        });
        const loadedDiceComponents = loadedDiceArr.map((die, idx) => {
            const x = idx%8;
            const y = Math.floor((idx)/8);
            return <Dice key={uniqid()} max={die} value={loadedDiceRolls[idx]} position={[-8 + 2*x, 5 - 2*y,0]}/>
        })
        setDice(loadedDiceComponents);
        setTotal(loadedDiceRolls.reduce((a,b) => a + b, 0))
    }

    //Delete a saved dice combination
    const onDeleteClick = (e) => {
        const toDelete = e.target.parentNode.parentNode.firstChild.dataset.value;
        const toDeleteArr = toDelete.split("+").map((num) => {
            return parseInt(num);
        });
        const newCombs = combinations.filter((comb) => comb.toString() !== toDeleteArr.toString())
        setCombinations(newCombs);
    };

    //Save current dice combination
    const onSaveClick = (e) => {
        if(dice.length > 0){
            const savedDice = dice.map((die) => {
                return die.props.max;
            });
            if(!isArrayInArray(combinations,savedDice)){
                setCombinations(combinations => [...combinations, savedDice]);
            }else{
                setAlreadySaved(true);
            }
        }else{
            setSaveNone(true);
        }
    };

    //Remove all dice from the board
    const onResetClick = (e) => {
        setDice([]);
        setTotal(0);
    }

    return (
        <div id='diceroller'>
            <div id='side'>
                <div id='sideTitle'>Saved Combinations</div>
                <CombinationList combinations={combinations} onLoadClick={onLoadClick} onDeleteClick={onDeleteClick}/>
            </div>
            <div id='main'>
                <DiceAdder onAddClick={onAddClick}/>
                <Diceboard dice={dice}/>
                <TotalRoll total={total}/>
                <div id='options'>
                    <button id='roll' onClick={onRollClick}>Roll</button>
                    <button id='save' onClick={onSaveClick}>Save</button>
                    <button id='reset' onClick={onResetClick}>Reset</button>
                </div>
            </div>
            <MaximumDice trigger={overMax} setTrigger={setOverMax}/>
            <Saved trigger={alreadySaved} setTrigger={setAlreadySaved}/>
            <SaveNone trigger={saveNone} setTrigger={setSaveNone}/>
        </div>
    );
};

export default Diceroller;