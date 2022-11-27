import React from "react";
import './TotalRoll.css';

const TotalRoll = ({total}) => {
    return (
        <div id="total">
            Total 
            <span id="totalValue"> &nbsp; {total}</span>
        </div>
    );
};

export default TotalRoll;