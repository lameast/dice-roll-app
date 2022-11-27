import React from "react";
import './SaveNone.css';

const SaveNone = (props) => {
    return (props.trigger) ? (
        <div className="saveNone">
            <div className="saveNone-inner">
                <div>Add some dice to the board before saving!</div>
                <div className="close-btn" onClick={() => {props.setTrigger(false)}}>x</div>
            </div>
        </div>
    ) : '';
};

export default SaveNone;