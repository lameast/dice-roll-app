import React from 'react';
import Combination from './Combination';
import uniqid from 'uniqid';

const CombinationList = ({combinations, onLoadClick, onDeleteClick}) => {
    const combinationList = combinations.map((combination) => {
        return <Combination key={uniqid()} dice={combination} onLoadClick={onLoadClick} onDeleteClick={onDeleteClick}/>
    });

    return (
        <div className='combinationList'>
            {combinationList}
        </div>
    );
};

export default CombinationList;