import React from "react";

const TotalRoll = ({total}) => {
    return (
        <div id="total">
            Total 
            <span id="totalValue"> &nbsp; {total}</span>
        </div>
    );
};

export default TotalRoll;