import React from 'react';
import Dice from './Dice';
import uniqid from 'uniqid';
import './Diceboard.css';
import { Canvas } from '@react-three/fiber';

const Diceboard = ({dice, values}) => {
    //max 6 dice per row
    /*
    const diceBoard = dice.map((die, i) => {
        let row = Math.floor(i/6);
        let xPosition = i%6;
        return <Dice key={uniqid()} max={die} value={values[i]} position={[-6 + 2*xPosition,2*row,0]}/>
    });
    return (
        <div id='diceboard'>
            {diceBoard}
        </div>
    );
    */
    return (
        <Canvas id='diceboard' orthographic camera={{zoom:50, position: [0,0,100], left: -5, right: 5, top: 5, bottom: -5}}>
            <ambientLight intensity={0.8} />
            <directionalLight color="white" position={[0, 0, 5]} />
            <mesh>
                {dice}
            </mesh>
            {dice}
        </Canvas>
    );
};

export default Diceboard;