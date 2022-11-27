import React, {useState} from "react";
import Help from "./Help";
import './Header.css';

const Header = () => {

    const [help, setHelp] = useState(false);

    return (
        <div id="header">
            <div id="appTitle">Dice Roller by lameast</div>
            <div id="help" onClick={() => (setHelp(true))}>Help</div>
            <Help trigger={help} setTrigger={setHelp}/>
        </div>
    );
};

export default Header;