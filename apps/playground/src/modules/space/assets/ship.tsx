
import * as THREE from "three";
import React, { forwardRef, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useMantineTheme } from "@mantine/core";
import { getColor } from "utils";
import { GroupProps } from "@react-three/fiber";


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

interface ShipProps {
  colors?: {primary?: string, secondary?: string}
}

const defaultColors: ShipProps['colors'] = {primary: '#3a3a3a', secondary: 'white'}
// One-click copy/paste from the poimandres market: https://market.pmnd.rs/model/low-poly-spaceship
export const Ship = forwardRef<THREE.Group, ShipProps & GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf') as GLTFResult;
  const theme =  useMantineTheme()
  const colors = {...defaultColors, primary: theme.colors.orange[9], ...props?.colors}
  useLayoutEffect(() => {
    Object.values(materials).forEach((material) => {
      material.roughness = 0.75
    })
  }, [])
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Cube005.geometry} material={materials.Mat0} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_1.geometry} material={materials.Mat1} material-color={colors.secondary} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_2.geometry} material={materials.Mat2} material-envMapIntensity={0.2} material-color={colors.primary} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_3.geometry} material={materials.Window_Frame} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_4.geometry} material={materials.Mat4} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_6.geometry} material={materials.Window} />
    </group>
  )
})
