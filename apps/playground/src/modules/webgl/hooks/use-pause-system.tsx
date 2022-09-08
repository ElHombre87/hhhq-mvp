import { Divider, Text } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { useState, useEffect } from "react";
import { ConfigTable } from "../components/ConfigTable";
import { IInputsManager } from "../controllers/InputController";
import { useInputManager } from "./use-inputs-manager";

export function openControlsModal(inputs: IInputsManager, onClose: () => void) {
  openModal({
    size: "xl",
    trapFocus: false,
    title: 'Paused',
    children: (
    <>
      <Text align="center" weight={400}>Close this window to resume</Text>
      <Divider my="xl"/>
      <ConfigTable config={inputs.config} />
    </>
    ),
    onClose: onClose,
  });
}

export const usePauseSystem = () => {
  const inputs = useInputManager();
  const [paused, setPause] = useState(false);

  const togglePause = () => {
    setPause(v => !v);
  }

  useEffect(() => {
    if (!paused){
      closeAllModals();
      inputs.start();
    }
    inputs.stop();
    openControlsModal(inputs, () => setPause(false));
  }, [paused, inputs]);

  return {paused, setPause, togglePause}
}
