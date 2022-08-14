import type { Context, Sender } from './connector';

// consider multiple injected wallets. prefer metamask over others (coinbase, rabby, ...)
// TODO: we can specify what wallet we want by checking various properties differently

import { AddEthereumChainParameter, Provider, ProviderConnectInfo, ProviderRpcError } from "../types";
import { MetaMaskProvider } from "./injected.types";

import detect from  '@metamask/detect-provider';

/**
 * Converts a base 16 chain id to base 10
 * @param chainId base 16 chain id with 0x prefix -> 0xfa
 * @returns base 10 for the chain id
 */
 export const parseChainId = (chainId: string) => Number.parseInt(chainId, 16);

// i.e. rabby has isMetamask=true AND isRabby=true
export const getActualProvider = (p: MetaMaskProvider): Provider => {
  let provider = p;
  if (p.providers?.length)
    provider = p.providers.find((p) => p.isMetaMask) ?? p.providers[0]
  return provider;
}

export async function getProvider(ctx: Context): Promise<Provider> {
  // if (ctx.provider) return ctx.provider;
  // const detect = (await import('@metamask/detect-provider')).default;
  const provider = getActualProvider(await detect(ctx.options) as Provider);
  if (!provider) throw new Error();
  return provider;
}

// service functions for injected ethereum wallets

export async function getChainId(provider: Provider): Promise<string> {
  return provider.request({ method: 'eth_chainId' }) as Promise<string>;
}

export async function getAccounts(provider: Provider): Promise<string[]> {
  return provider.request({ method: 'eth_requestAccounts' }) as Promise<string[]>
}

export async function switchChain(provider: Provider, chainId: string): Promise<any> {
  return provider.request({method: 'wallet_switchEthereumChain', params: [{ chainId }]})
}

export async function addChain(provider: Provider, params: AddEthereumChainParameter): Promise<any> {
  const chainId = `0x${params.chainId.toString(16)}`;
  return provider.request({method: 'wallet_addEthereumChain', params: [{ ...params, chainId }]})
}

type BalanceType = "latest" | "earliest" | "pending";
export async function getNativeBalance(provider: Provider, address: string, target: BalanceType = 'latest'): Promise<number> {
  const balance = await provider.request({
    method: 'eth_getBalance',
    params: [address, target] }) as number;
  // TODO: use proper wei converter
  return balance ? balance / (10**18) : 0;
}


// listeners
export namespace callback {
  const ENABLE_LOG = true; // process.env.NODE_ENV === 'development';
  function log(method: string, ...args: any) {
    return ENABLE_LOG && console.info(`👂 ${method}`, ...args);
  }

  export function connect(send: Sender) {
    return (args: ProviderConnectInfo) => {
      log('connect', args);
      send({ type: 'connected', chainId: parseChainId(args.chainId) });
    }
  }

  export function disconnect(send: Sender) {
    return (error: ProviderRpcError) => {
      log('disconnect', error)
      send({ type: 'error', error }); // this has effect only if we're not in 'ready' state
      send({ type: 'disconnect' }); // if  'ready' we just disconnect.
    }
  }
  export function chainChanged(send: Sender) {
    return (chainId: string) => {
      log('chain changed', chainId, parseChainId(chainId));
      send({ type: 'changeChain', chainId: parseChainId(chainId) });
    }
  }
  export function accountsChanged(send: Sender) {
    return (accounts: string[]) => {
      log('account change', accounts);
      send({ type: 'changeAccounts', accounts })
    }
  }
}
