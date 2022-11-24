import React, { useRef, useState, useLayoutEffect } from 'react'
import createDice from '../diceCreator';
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import * as THREE from 'three';
import uniqid from 'uniqid';
import { Vector3 } from 'three';
/*
const Dice = ({value, max}) => {
  return (
    <div className={`d${max}`}>d{max} rolled {value}</div>
  );
};
*/

function Dice(props) {
  const mesh = useRef();
  const images = [];
  for(let i = 1; i <= props.max; i++){
    images.push(require(`./dicetextures/${i}.png`));
  }
  const texture = useLoader(TextureLoader, images);
  const meshTextures =  texture.map((tex, idx) => {
    return <meshStandardMaterial key={uniqid()} map={tex} attach={`material-${idx}`} />
  });
  console.log(meshTextures);
  console.log(props.max, props.value);
  let geometry = createDice(props.max);
  useLayoutEffect(() => {
    console.log(mesh.current.geometry);
    if(mesh.current.geometry.groups.length === 0){
      switch(props.max){
        default:
          console.log("Not a valid dice");
          break;
        case 4:
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(3*i, 3, i);
          }
          const based4 = new THREE.Vector2(0, 0.5);
          const centerd4 = new THREE.Vector2(0.5,0.5);
          let baseUVsd4 = [
            based4.clone().rotateAround(centerd4, THREE.MathUtils.degToRad(0)),
            based4.clone().rotateAround(centerd4, THREE.MathUtils.degToRad(120)),
            based4.clone().rotateAround(centerd4, THREE.MathUtils.degToRad(240))
          ];
          let uvsd4 = [];
          for (let i = 0; i < 4; i++){
            uvsd4.push(
              baseUVsd4[0].x, baseUVsd4[0].y,
              baseUVsd4[1].x, baseUVsd4[1].y,
              baseUVsd4[2].x, baseUVsd4[2].y
            );
          }
          mesh.current.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvsd4, 2));
          
          break;
        case 8:
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(3*i, 3, i);
          }
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(3*i, 3, i);
          }
          const based8 = new THREE.Vector2(0, 0.5);
          const centerd8 = new THREE.Vector2(0.5,0.5);
          let baseUVsd8 = [
            based8.clone().rotateAround(centerd8, THREE.MathUtils.degToRad(0)),
            based8.clone().rotateAround(centerd8, THREE.MathUtils.degToRad(120)),
            based8.clone().rotateAround(centerd8, THREE.MathUtils.degToRad(240))
          ];
          let uvsd8 = [];
          for (let i = 0; i < 8; i++){
            uvsd8.push(
              baseUVsd8[0].x, baseUVsd8[0].y,
              baseUVsd8[1].x, baseUVsd8[1].y,
              baseUVsd8[2].x, baseUVsd8[2].y
            );
          }
          mesh.current.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvsd8, 2));
          
          break;
        case 10:
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(6*i, 6, i);
          };
          const based10 = new THREE.Vector2(0, 0.5);
          const centerd10 = new THREE.Vector2();
          let baseUVsd10 = [
            based10.clone().rotateAround(centerd10, THREE.MathUtils.degToRad(0)).addScalar(0.5),
            based10.clone().rotateAround(centerd10, THREE.MathUtils.degToRad(100)).addScalar(0.5),
            based10.clone().rotateAround(centerd10, THREE.MathUtils.degToRad(180)).addScalar(0.5),
            based10.clone().rotateAround(centerd10, THREE.MathUtils.degToRad(260)).addScalar(0.5)
          ];

          let uvsd10 = [];
          for (let i = 0; i < 5; i++){
            uvsd10.push(
              baseUVsd10[1].x, baseUVsd10[1].y,
              baseUVsd10[2].x, baseUVsd10[2].y,
              baseUVsd10[0].x, baseUVsd10[0].y,
              
              baseUVsd10[2].x, baseUVsd10[2].y,
              baseUVsd10[3].x, baseUVsd10[3].y,
              baseUVsd10[0].x, baseUVsd10[0].y,
            );
          }
          
          for (let i = 5; i < 10; i++){
            uvsd10.push(
              baseUVsd10[2].x, baseUVsd10[2].y,
              baseUVsd10[1].x, baseUVsd10[1].y,
              baseUVsd10[0].x, baseUVsd10[0].y,
              
              baseUVsd10[3].x, baseUVsd10[3].y,
              baseUVsd10[2].x, baseUVsd10[2].y,
              baseUVsd10[0].x, baseUVsd10[0].y,
            );
          }
          mesh.current.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvsd10, 2));
          mesh.current.geometry.computeVertexNormals();
          break;
        case 12:
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(9*i, 9, i);
          };
          //Adapted from https://jsfiddle.net/prisoner849/3zanmcbt/
          const base = new THREE.Vector2(0, 0.5);
          const center = new THREE.Vector2();
          const angle = THREE.MathUtils.degToRad(72);
          let baseUVs = [
            base.clone().rotateAround(center, angle * 1).addScalar(0.5),
            base.clone().rotateAround(center, angle * 2).addScalar(0.5),
            base.clone().rotateAround(center, angle * 3).addScalar(0.5),
            base.clone().rotateAround(center, angle * 4).addScalar(0.5),
            base.clone().rotateAround(center, angle * 0).addScalar(0.5)
          ];
          let uvs = [];
          for (let i = 0; i < 12; i++){
            uvs.push(
              baseUVs[1].x, baseUVs[1].y,
              baseUVs[2].x, baseUVs[2].y,
              baseUVs[0].x, baseUVs[0].y,
              
              baseUVs[2].x, baseUVs[2].y,
              baseUVs[3].x, baseUVs[3].y,
              baseUVs[0].x, baseUVs[0].y,
              
              baseUVs[3].x, baseUVs[3].y,
              baseUVs[4].x, baseUVs[4].y,
              baseUVs[0].x, baseUVs[0].y
            );
          }
          mesh.current.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
          break;
        case 20:
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(3*i, 3, i);
          }
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(3*i, 3, i);
          }
          const based20 = new THREE.Vector2(0, 0.5);
          const centerd20 = new THREE.Vector2(0.5,0.5);
          let baseUVsd20 = [
            based20.clone().rotateAround(centerd20, THREE.MathUtils.degToRad(0)),
            based20.clone().rotateAround(centerd20, THREE.MathUtils.degToRad(120)),
            based20.clone().rotateAround(centerd20, THREE.MathUtils.degToRad(240))
          ];
          let uvsd20 = [];
          for (let i = 0; i < 20; i++){
            uvsd20.push(
              baseUVsd20[0].x, baseUVsd20[0].y,
              baseUVsd20[1].x, baseUVsd20[1].y,
              baseUVsd20[2].x, baseUVsd20[2].y
            );
          }
          mesh.current.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvsd20, 2));
      }
      
    }
    const norm = mesh.current.geometry.getAttribute('normal');
    const vector = new Vector3();
    vector.fromBufferAttribute(norm, 0);
    console.log(vector);
    mesh.current.geometry.lookAt(vector.multiplyScalar(-1));
  });
  useFrame((state, delta) => (mesh.current.rotation.y += 0.01))
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}>
      {geometry}
      
      {meshTextures}
    </mesh>
  )
}

export default Dice;