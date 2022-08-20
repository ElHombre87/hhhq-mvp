import type detectEthereumProvider from "@metamask/detect-provider";
import { Provider, UpdateEventData } from "../types";

export type UpdateEvent = { type: 'update'} & UpdateEventData;

// metamask / injected dedicated options
export type MetaMaskProvider = Provider & {
  isMetaMask?: boolean;
  isConnected?: () => boolean;
  providers?: MetaMaskProvider[]
}

export type DetectOptions = Parameters<typeof detectEthereumProvider>[0];

