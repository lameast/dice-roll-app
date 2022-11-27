import React from "react";
import './MaximumDice.css';

const MaximumDice = (props) => {
    return (props.trigger) ? (
        <div className="maximum">
            <div className="maximum-inner">
                <div>The maximum number of dice has already been reached. Any more cannot be added.</div>
                <div className="close-btn" onClick={() => {props.setTrigger(false)}}>x</div>
            </div>
        </div>
    ) : '';
};

export default MaximumDice;