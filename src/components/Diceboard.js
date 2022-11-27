import React from 'react';
import './Diceboard.css';
import { Canvas } from '@react-three/fiber';

const Diceboard = ({dice}) => {
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