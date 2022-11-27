import React from 'react';
import Combination from './Combination';
import uniqid from 'uniqid';
import './CombinationList.css';

const CombinationList = ({combinations, onLoadClick, onDeleteClick}) => {
    const combinationList = combinations.map((combination) => {
        return <Combination key={uniqid()} dice={combination} onLoadClick={onLoadClick} onDeleteClick={onDeleteClick}/>
    });
    if(combinations.length > 0){
        return (
            <div className='combinationList'>
                {combinationList}
            </div>
        );
    }else{
        return (
            <div id='noCombinations'>Click Save to save a dice combination!</div>
        );
    }
};

export default CombinationList;