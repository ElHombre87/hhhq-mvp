
import * as THREE from "three";
import React, { forwardRef, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useMantineTheme } from "@mantine/core";
import { getColor } from "utils";


type GLTFResult = GLTF & {
  nodes: {
    Cube005: THREE.Mesh;
    Cube005_1: THREE.Mesh;
    Cube005_2: THREE.Mesh;
    Cube005_3: THREE.Mesh;
    Cube005_4: THREE.Mesh;
    Cube005_6: THREE.Mesh;
  };
  materials: {
    Mat0: THREE.MeshStandardMaterial;
    Mat1: THREE.MeshStandardMaterial;
    Mat2: THREE.MeshStandardMaterial;
    Mat4: THREE.MeshStandardMaterial;
    Window_Frame: THREE.MeshStandardMaterial;
    Window: THREE.MeshStandardMaterial;
  };
};

// One-click copy/paste from the poimandres market: https://market.pmnd.rs/model/low-poly-spaceship
export const Ship = forwardRef<THREE.Group, any>((props, ref) => {
  const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf') as GLTFResult;
  const theme =  useMantineTheme()
  console.info(theme)
  useLayoutEffect(() => {
    Object.values(materials).forEach((material) => {
      material.roughness = 0.75
    })
  }, [])
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Cube005.geometry} material={materials.Mat0} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_1.geometry} material={materials.Mat1} material-color={theme.colors.green[6]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_2.geometry} material={materials.Mat2} material-envMapIntensity={0.2} material-color="gray" />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_3.geometry} material={materials.Window_Frame} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_4.geometry} material={materials.Mat4} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_6.geometry} material={materials.Window} />
    </group>
  )
})
