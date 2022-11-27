import * as THREE from "three";
import { Canvas, useFrame } from '@react-three/fiber'

const D10Geometry = () => {
    // Sourced from https://github.com/byWulf/threejs-dice/blob/master/lib/dice.js#L499
    // Creates the geometry for a ten sided dice
    const sides = 10
    const radius = 0.7
    const vertices = [
      [0, 0, 1],
      [0, 0, -1]
    ].flat()
  
    for (let i = 0; i < sides; ++i) {
      const b = (i * Math.PI * 2) / sides
      vertices.push(-Math.cos(b), -Math.sin(b), 0.105 * (i % 2 ? 1 : -1))
    }
  
    const faces = [
      [0, 11, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 5],
      [0, 5, 6],
      [0, 6, 7],
      [0, 7, 8],
      [0, 8, 9],
      [0, 9, 10],
      [0, 10, 11],
      [1, 3, 2],
      [1, 4, 3],
      [1, 5, 4],
      [1, 6, 5],
      [1, 7, 6],
      [1, 8, 7],
      [1, 9, 8],
      [1, 10, 9],
      [1, 11, 10],
      [1, 2, 11]
    ].flat()
    const args = [vertices, faces, radius, 0]
    const pentagonalTrapezohedronGeometry = <polyhedronGeometry args={[...args]}/>;
    
    return pentagonalTrapezohedronGeometry;
}

const createDice = (faces) => {
    //Return the correct geometry depending on the number of faces
    let geometry;
    switch(faces){
        default:
            console.log('Not a valid dice');
            break;
        case 4:
            geometry = <tetrahedronGeometry  args={[0.9,0]} />;
            console.log(geometry);
            break;
        case 6:
            geometry = <boxGeometry  args={[1,1,1]} />;
            break;
        case 8:
            geometry = <octahedronGeometry  args={[0.8,0]} />;
            break;
        case 10:
            geometry = D10Geometry();
            break;
        case 12:
            geometry = <dodecahedronGeometry  args={[0.7,0]} />;
            break;
        case 20:
            geometry = <icosahedronGeometry  args={[0.7,0]} />;
            break;
        
    };
    return geometry;
}

export default createDice;