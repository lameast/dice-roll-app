import React, { useRef, useState } from 'react'
import createDice from '../diceCreator';
import { Canvas, useFrame } from '@react-three/fiber'
/*
const Dice = ({value, max}) => {
  return (
    <div className={`d${max}`}>d{max} rolled {value}</div>
  );
};
*/

function Dice(props) {
  const mesh = useRef(null);
  //useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  let geometry = createDice(props.max);
  useFrame((state, delta) => (mesh.current.rotation.y += 0.01))
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}>
      {geometry}
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

export default Dice;