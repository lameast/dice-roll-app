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

  const mesh = useRef({newRotation: new THREE.Euler()});
  const images = [];
  //Get textures for faces of the dice
  for(let i = 1; i <= props.max; i++){
    images.push(require(`./dicetextures/${i}.png`));
  }

  const texture = useLoader(TextureLoader, images);
  const meshTextures =  texture.map((tex, idx) => {
    return <meshStandardMaterial key={uniqid()} map={tex} attach={`material-${idx}`} />
  });

  let geometry = createDice(props.max);
  useLayoutEffect(() => {
    //Determine UV mapping for textures onto faces of dice
    //Also compute the rotation required to display the face of the rolled dice value
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
          const centerd4 = new THREE.Vector2();
          let baseUVsd4 = [
            based4.clone().rotateAround(centerd4, THREE.MathUtils.degToRad(0)).addScalar(0.5,0.5),
            based4.clone().rotateAround(centerd4, THREE.MathUtils.degToRad(120)).addScalar(0.5,0.5),
            based4.clone().rotateAround(centerd4, THREE.MathUtils.degToRad(240)).addScalar(0.5,0.5)
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
          const normd4 = mesh.current.geometry.getAttribute('normal');
          const vectord4 = new Vector3();
          vectord4.fromBufferAttribute(normd4, (props.value-1)*3);

          const camerad4 = new Vector3(0,0,1);
          const rotationAngled4 = vectord4.angleTo(camerad4);
          vectord4.cross(camerad4).normalize();
          const quaterniond4 = new THREE.Quaternion();
          quaterniond4.copy(mesh.current.quaternion);
          quaterniond4.setFromAxisAngle(vectord4, rotationAngled4);
          const eulerd4 = new THREE.Euler();
          eulerd4.setFromQuaternion(quaterniond4);
          mesh.current.newRotation = eulerd4;
          break;
        case 8:
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(3*i, 3, i);
          }
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(3*i, 3, i);
          }
          const based8 = new THREE.Vector2(0, 0.5);
          const centerd8 = new THREE.Vector2();
          let baseUVsd8 = [
            based8.clone().rotateAround(centerd8, THREE.MathUtils.degToRad(0)).addScalar(0.5,0.5),
            based8.clone().rotateAround(centerd8, THREE.MathUtils.degToRad(120)).addScalar(0.5,0.5),
            based8.clone().rotateAround(centerd8, THREE.MathUtils.degToRad(240)).addScalar(0.5,0.5)
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
          const normd8 = mesh.current.geometry.getAttribute('normal');
          const vectord8 = new Vector3();
          vectord8.fromBufferAttribute(normd8, (props.value-1)*3);

          const camerad8 = new Vector3(0,0,1);
          const rotationAngled8 = vectord8.angleTo(camerad8);
          vectord8.cross(camerad8).normalize();
          const quaterniond8 = new THREE.Quaternion();
          quaterniond8.copy(mesh.current.quaternion);
          quaterniond8.setFromAxisAngle(vectord8, rotationAngled8);
          const eulerd8 = new THREE.Euler();
          eulerd8.setFromQuaternion(quaterniond8);
          mesh.current.newRotation = eulerd8;
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
          const normd10 = mesh.current.geometry.getAttribute('normal');
          const vectord10 = new Vector3();
          vectord10.fromBufferAttribute(normd10, (props.value-1)*6);

          const camerad10 = new Vector3(0,0,1);
          const rotationAngled10 = vectord10.angleTo(camerad10);
          vectord10.cross(camerad10).normalize();
          const quaterniond10 = new THREE.Quaternion();
          quaterniond10.copy(mesh.current.quaternion);
          quaterniond10.setFromAxisAngle(vectord10, rotationAngled10);
          const eulerd10 = new THREE.Euler();
          eulerd10.setFromQuaternion(quaterniond10);
          mesh.current.newRotation = eulerd10;
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
          const normd12 = mesh.current.geometry.getAttribute('normal');
          const vectord12 = new Vector3();
          vectord12.fromBufferAttribute(normd12, (props.value-1)*9);

          const camerad12 = new Vector3(0,0,1);
          const rotationAngled12 = vectord12.angleTo(camerad12);
          vectord12.cross(camerad12).normalize();
          const quaterniond12 = new THREE.Quaternion();
          quaterniond12.copy(mesh.current.quaternion);
          quaterniond12.setFromAxisAngle(vectord12, rotationAngled12);
          const eulerd12 = new THREE.Euler();
          eulerd12.setFromQuaternion(quaterniond12);
          mesh.current.newRotation = eulerd12;
          break;
        case 20:
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(3*i, 3, i);
          }
          for(let i = 0; i < props.max; i++){
            mesh.current.geometry.addGroup(3*i, 3, i);
          }
          const based20 = new THREE.Vector2(0, 0.5);
          const centerd20 = new THREE.Vector2();
          let baseUVsd20 = [
            based20.clone().rotateAround(centerd20, THREE.MathUtils.degToRad(0)).addScalar(0.5,0.5),
            based20.clone().rotateAround(centerd20, THREE.MathUtils.degToRad(120)).addScalar(0.5,0.5),
            based20.clone().rotateAround(centerd20, THREE.MathUtils.degToRad(240)).addScalar(0.5,0.5)
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

          /*Rotate normal vector of desired face of dice to the camera*/
          const normd20 = mesh.current.geometry.getAttribute('normal');
          const vectord20 = new Vector3();
          vectord20.fromBufferAttribute(normd20, (props.value-1)*3);

          const camerad20 = new Vector3(0,0,1);
          const rotationAngled20 = vectord20.angleTo(camerad20);
          vectord20.cross(camerad20).normalize();
          const quaternion = new THREE.Quaternion();
          quaternion.copy(mesh.current.quaternion);
          quaternion.setFromAxisAngle(vectord20, rotationAngled20);
          const euler = new THREE.Euler();
          euler.setFromQuaternion(quaternion);
          mesh.current.newRotation = euler;
      }
      
    }
    if(props.max === 6){
      const normd6 = mesh.current.geometry.getAttribute('normal');
      const vectord6 = new Vector3();
      if(props.value === 6){
        vectord6.fromBufferAttribute(normd6, (props.value-2)*4);
      }else if (props.value === 5){
        vectord6.fromBufferAttribute(normd6, (props.value)*4);
      }else{
        vectord6.fromBufferAttribute(normd6, (props.value-1)*4);
      }


      const camerad6 = new Vector3(0,0,1);
      const rotationAngled6 = vectord6.angleTo(camerad6);
      vectord6.cross(camerad6).normalize();
      const quaterniond6 = new THREE.Quaternion();
      quaterniond6.copy(mesh.current.quaternion);
      quaterniond6.setFromAxisAngle(vectord6, rotationAngled6);
      const eulerd6 = new THREE.Euler();
      eulerd6.setFromQuaternion(quaterniond6);
      mesh.current.newRotation = eulerd6;
    }
   
  }, [props.value, props.max]);

  useFrame((state, delta) => {
    //console.log(mesh.current.rotation.y);
    if(mesh.current.rotation.y > Math.PI+0.02){
      mesh.current.rotation.y -= (Math.PI*2+0.02);
    }
    if(!(mesh.current.rotation.y <= mesh.current.newRotation.y+0.03 && mesh.current.rotation.y >= mesh.current.newRotation.y))
    mesh.current.rotation.y += 0.02
  });

  useFrame((state, delta) => {
    //console.log(mesh.current.rotation.x);
    //console.log(mesh.current.newRotation.x);
    if(mesh.current.rotation.x > Math.PI+0.02){
      mesh.current.rotation.x -= (Math.PI*2+0.02);
    }
    if(!(mesh.current.rotation.x <= mesh.current.newRotation.x+0.03 && mesh.current.rotation.x >= mesh.current.newRotation.x))
    mesh.current.rotation.x += 0.02
  });
  useFrame((state, delta) => {
    //console.log(mesh.current.rotation.z);
    //console.log(mesh.current.newRotation.z);
    if(mesh.current.rotation.z > Math.PI+0.02){
      mesh.current.rotation.z -= (Math.PI*2+0.02);
    }
    if(!(mesh.current.rotation.z <= mesh.current.newRotation.z+0.03 && mesh.current.rotation.z >= mesh.current.newRotation.z))
    mesh.current.rotation.z += 0.02
  });

  return (
    <mesh
      {...props}
      ref={mesh} >
      {geometry}
      {meshTextures}
    </mesh>
  )
}

export default Dice;