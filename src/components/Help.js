import React from "react";
import './Help.css';

const Help = (props) => {
    return (props.trigger) ? (
        <div className="help">
            <div className="help-inner">
                <ol>
                    <li>Welcome to this Dice Roller App!</li>
                    <li>Click on the d4, d6, d8, d12, d20 buttons to add the
                        respective dice to the board.</li>
                    <li>Click Roll to roll the dice, Save to save the current dice 
                        combination and Reset to remove all dice from the board.</li>
                    <li>Saved dice combinations can be loaded and saved combinations can be deleted.</li>
                    <li>A maximum of 48 dice is currently allowed.</li>
                </ol>
                <div className="close-btn" onClick={() => {props.setTrigger(false)}}>x</div>
            </div>
        </div>
    ) : '';
};

export default Help;