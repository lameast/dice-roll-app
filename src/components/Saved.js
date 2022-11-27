import React from "react";
import './Saved.css';

const Saved = (props) => {
    return (props.trigger) ? (
        <div className="saved">
            <div className="saved-inner">
                <div>Combination already saved.</div>
                <div className="close-btn" onClick={() => {props.setTrigger(false)}}>x</div>
            </div>
        </div>
    ) : '';
};

export default Saved;