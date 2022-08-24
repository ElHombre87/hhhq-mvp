import { useCallback, useRef } from 'react';
import * as THREE from 'three';
import { useInterpret, useSelector } from "@xstate/react";

import { createUseContext } from "utils";
import { machine, selectors } from '../state';
import { InterpreterFrom } from 'xstate';

export interface IShipContext {
  shipRef: React.MutableRefObject<THREE.Mesh>;
  cameraRef: React.MutableRefObject<THREE.Camera>;
  // service: InterpreterFrom<typeof machine>;
  // position: THREE.Vector3;
  // rotation: THREE.Euler;
  // accelerate: () => void;
  // decelerate: () => void;
  // setRotation: (rotation: THREE.Euler) => void;
};

const [ShipContextProvider, useShipContext] = createUseContext({} as IShipContext);
export { ShipContextProvider, useShipContext };

export const ShipProvider: React.FC = ({ children }) => {
  let shipRef = useRef<THREE.Mesh>(null!);
  let cameraRef = useRef<THREE.Camera>(null!);
  // const service = useInterpret(machine, { devTools: true });

  // const position = useSelector(service, selectors.position);
  // const rotation = useSelector(service, selectors.rotation);

  // const accelerate = useCallback(() => { service.send('START_ACCELERATE'); }, [service.send]);
  // const decelerate = useCallback(() => {service.send('START_DECELERATE'); }, [service.send]);

  // const setRotation = useCallback((rotation: THREE.Euler) => {
  //   service.send('SET_ROTATION', { rotation });
  // } , [service.send]);

  const ctx: IShipContext = {
    // service,
    shipRef,
    cameraRef,
    // position,
    // rotation,
    // accelerate,
    // decelerate,
    // setRotation,
  };

  return (
    <ShipContextProvider value={ctx}>{children}</ShipContextProvider>
  );
}
