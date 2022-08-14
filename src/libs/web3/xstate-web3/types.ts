import type { EventEmitter } from 'node:events'

export type UpdateEventData = {
  chainId: number
  accounts: string[]
}
| {
  chainId: number
  accounts?: never
}
| {
  chainId?: never
  accounts: string[]
};

// per EIP-3085
export interface AddEthereumChainParameter {
  chainId: number
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

// per EIP-1193
export interface RequestArguments {
  readonly method: string
  readonly params?: readonly unknown[] | object
}
// per EIP-1193
export interface Provider extends EventEmitter {
  request(args: RequestArguments): Promise<unknown>
}
// per EIP-1193
export interface ProviderConnectInfo {
  readonly chainId: string
}
// per EIP-1193
export interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

// per EIP-747
export interface WatchAssetParameters {
  address: string // The address that the token is at.
  symbol: string // A ticker symbol or shorthand, up to 5 chars.
  decimals: number // The number of decimals in the token
  image?: string // A string url of the token logo
}
