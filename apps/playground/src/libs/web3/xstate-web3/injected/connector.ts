import type { Sender as XSender } from "xstate";
import { ContextFrom, EventFrom } from "xstate";
import { createModel } from "xstate/lib/model";

import type { UpdateEventData, ProviderRpcError, WatchAssetParameters, AddEthereumChainParameter } from '../types';
import type { DetectOptions, MetaMaskProvider } from "./injected.types";
import { getProvider, callback, parseChainId, getChainId, getAccounts, switchChain, addChain, getNativeBalance } from "./functions";

export class NoMetaMaskError extends Error {
  public constructor() {
    super('MetaMask not installed')
    this.name = NoMetaMaskError.name
    Object.setPrototypeOf(this, NoMetaMaskError.prototype)
  }
}

export const createConnector = (options: DetectOptions = {}) => createModel({
  chainId: -1 as number,
  accounts: [] as string[],
  balance: 0,
  getProvider: getProvider,
  options: options,
}, {
  events: {
    /** update event from (dis)connected connector */
    update: (values: UpdateEventData) => ({ ...values }),

    changeChain: (chainId: number) => ({ chainId }),
    changeAccounts: (accounts: string[]) => ({ accounts }),
    updateBalance: (balance: number) => ({ balance }),
    /** triggers the connector to connect to the network */
    connect: (desiredChain?: number | AddEthereumChainParameter) => ({ desiredChain }),
    /** attempts to disconnect */
    disconnect: () => ({}),
    /** callback event (onDone) for the connection service */
    connected: (values: UpdateEventData) => ({ ...values }),
    /** callback event (onError) for the connection service */
    error: (error: ProviderRpcError) => ({ error }),
    setProvider: (provider: MetaMaskProvider) => ({ provider }),
    addAsset: (asset: WatchAssetParameters) => ({ asset }),
  }
});

export type Events = EventFrom<ReturnType<typeof createConnector>>;
export type Context = ContextFrom<ReturnType<typeof createConnector>>;
export type Sender = XSender<Events>;

export const createWalletMachine = (options: DetectOptions = {}) => {
  const model = createConnector(options);
  const machine = 
  /** @xstate-layout N4IgpgJg5mDOIC5QFswBcCGyOwNYFoBjAewDtSxC1iAnAOgEtSG0BiCMsR0gN2Ny4R0lNPgAONYjwZCaiUGOKwWDMvJAAPRABYATLroAGAGzHdAZgCcARm3mA7AFZru4wBoQAT0T5jJupbG9roAHFYmIYaW2gC+MR6omNh4RGQUVLTcLKxgNJL0YgA2GGgAZrTIdEJoIuKS0rLqispoqqTqWgj41mF0juaRhqGWunbaIe5ePvZOdCE2IT3GI84hcQnoWDgEJOQimTRgGBCeVQywu+k1EKyXIk1KKmpImojmjpZ05sbmUY6GjlGJmsHm8XVsBnMLihgNCIUc2m0xnWIESWxSdwy9EOx1OEHOmOurAeLTaHUQxhCBks3wmhnpwUMiNBPl+hiM9msHxC9miXJhKLRyR2aX22KOJzohKYUHYnG4fAEdGwpAArhhCqk9lQSU92i9Oo4EXRedZ7NpDMFjNYovYWeDjAEaaNERbtI4fo5BZthVqrgcJadpaRZbl8nQiiVyjRKir1ZrCbrWs9QJ1rGa6PprSNdJZ6ZZLB77fh9CE6LY-Np0-CCwXzN6kts-WK6DjJYTIOwCaKdS9mnryQgjY6LTyPTNDFT7OZi9ZrXMXLn3dY88EvfFUT6m4SA7ipT2iccIABBWCwdBJskGxC8xxGBH2Ew2c2cmdTBA2z5I0wQ912eYNuiIratQ4q4nKFAKvwXDnmgqpiHUUgyLk+BgDwYCkGg8B9o8yb6qmbyAkYXIfCMhi2PYYTFgMZZBPCdj9MsYT2IBvo7mBJw5HkmSRmUFR0LB8GIQ0KFoRhWGXimrxdLo-jWFC9hBAyuiOPMkxgiWXLlgCgShK4-T6ax24HrunEdhAkn4dJlHsuYsmhAiNimNRIS0ZRfg8voK7vPWG5CsZIGmZ4twABYYCGYDHoQJCqph2EKLhV4ER+QzmHQVaKSEdj2e6ITFsMJoWoCUQOXZlhGRiJkccFhBhRFADCYVMJZg42u8dBmBMekIlWJiznmXyOMEVKecYYwVcB-rVaw8EQCUYAAEIauFhBgC1LwaYC9iZpRjljUydYeGmFF9Po2iPv8K4ArocQbqQxBCPFm6NpVgX0EwLDrcl5juh1oRrua+gOKMxaUWWVhmgWwR6GdE3NliraBmcFwHpAX3SQMjpmksyxGlSuggu+JY-R1SIAumnqqaMcPsYje7BlA6NpkEmaFhMQ3GM45E9MW4xOnZ-yPtE5i0jTVV0+2qMWThpJSZ0imfB6Kl-GNRW6LOfOLBYKmyWNLgzGLb0S2CCWy1ZnQ0pmrgrvoeZRIW6k+IC2gdbtegHTMFiG1NdBhrQTM+K4aV6BM7pOEMQ2uMWgJpf0NJmuRliUSM3tigHMk8uloRjUN-wqVaxYTNYXzPhMPLnVy5W3UAA */
  model.createMachine({
  tsTypes: {} as import('./connector.typegen').Typegen0,
  schema: {
    services: {} as {
      detectProvider: { data: MetaMaskProvider };
    },
  },
  id: 'metamask-connector',
  initial: 'init',
  states: {
    init: {
      invoke: {
        src: 'detectProvider',
        id: 'detect-provider',
        onDone: [
          {
            target: 'ready',
          },
        ],
        onError: [
          {
            actions: 'notifyError',
            target: 'error',
          },
        ],
      },
    },
    ready: {
      invoke: {
        src: 'setupProvider',
        id: 'setup-provider-events',
        onDone: [
          {
            target: '.disconnected',
          },
        ],
        onError: [
          {
            actions: 'notifyError',
            target: 'error',
          },
        ],
      },
      initial: 'disconnected',
      states: {
        disconnected: {
          always: {
            cond: (ctx) => !!ctx.accounts.length,
            target: 'connected',
          },
          on: {
            connect: {
              target: 'connecting',
            },
          },
        },
        connecting: {
          invoke: {
            src: 'connect',
            id: 'manual-connect',
            onDone: [
              {
                target: 'connected',
              },
            ],
            onError: [
              {
                actions: 'notifyError',
                target: 'disconnected',
              },
            ],
          },
        },
        connected: {
          invoke: {
            src: 'pollAccountInfo',
          },
          on: {
            disconnect: {
              actions: 'resetContext',
              target: 'disconnected',
            },
            addAsset: {},
          },
        },
      },
      on: {
        connected: {
          actions: 'assignValues',
        },
        changeAccounts: {
          actions: 'assignAccounts',
        },
        changeChain: {
          actions: 'assignChain',
        },
        updateBalance: {
          actions: 'assignAccountBalance',
        },
      },
    },
    error: {
      entry: 'notifyError',
      description:
        'error state for when we cannot get a provider. TODO: check periodically for wallet',
    },
  },
}, {
    actions: {
      assignAccounts: model.assign((_, { accounts }) => ({ accounts })),
      assignChain: model.assign((_, { chainId }) => ({ chainId })),
      assignAccountBalance: model.assign((_, {balance}) => ({ balance })),
      assignValues: model.assign((ctx, { accounts, chainId }) => ({
        accounts: accounts ?? [],
        chainId: chainId ?? -1
      })),
      resetContext: () => model.assign({ chainId: -1, accounts: [], balance: 0 }),
    },

    services: {
      /** checks if we have an available provider and returns a boolean */
      detectProvider: (ctx) => async (): Promise<boolean> => {
        const provider = await ctx.getProvider(ctx);
        if (!provider)
          throw new NoMetaMaskError();
        return !!provider;

      },
      setupProvider: (ctx, evt) => async (send) => {
        const provider = await ctx.getProvider(ctx);
        if (!provider)
          throw new NoMetaMaskError();

        console.info('registering provider event listeners');

        provider.on('connect', callback.connect(send));
        provider.on('disconnect', callback.disconnect(send));
        provider.on('chainChanged', callback.chainChanged(send));
        provider.on('accountsChanged', callback.accountsChanged(send));

        return () => {
          console.info('removing event listeners');
          provider.removeAllListeners();
        };
      },
      connect: (ctx, { desiredChain }) => async (send): Promise<void> => {
        const provider = await ctx.getProvider(ctx);

        if (!provider) throw new Error('Provider is not set.');

        const [chain, accounts] = await Promise.all([
          getChainId(provider),getAccounts(provider)
        ]);

        if (!accounts?.length) {
          throw new Error('No accounts found')
        }

        send({type: 'changeAccounts', accounts });

        // currently connected chain ~ dispatch event to register this one
        const currentChainId = parseChainId(chain);
        send({type: 'changeChain', chainId: currentChainId });

        // get the actual desired ChainID
        const desiredChainId = typeof desiredChain === 'number'
          ? desiredChain : desiredChain?.chainId;

        // either we didn't request a specific chainId or it matches
        // the current one. we're done.
        if (!desiredChainId || currentChainId === desiredChainId) {
          return;
        }
        // if we are here means we provided a desired chain but wallet is not
        // currently connected to that chain. Prompt to change network
        // and optionally add the chain if missing and all data is available
        const desiredChainIdHex = `0x${desiredChainId.toString(16)}`;

        await switchChain(provider, desiredChainIdHex)
        .catch(async (error: ProviderRpcError) => {
          const canAdd = desiredChain && typeof desiredChain !== 'number';
          // network not on wallet. prompt to add if possible
          if (error.code === 4902 && canAdd) {
            await addChain(provider, desiredChain)
          } else {
            throw error;
          }
        });

        // ensure sent chainId is the actual one we're connected
        const actualChain = parseChainId(await getChainId(provider));
        send({type: 'changeChain', chainId: actualChain });
      },
      pollAccountInfo: (ctx) => async (send) => {
        // TODO: Add polling for balance / listen to event
        // TODO: return the cancel polling function
        const provider = await ctx.getProvider(ctx);
        const account = ctx.accounts[0];
        if (!provider || !account) throw new Error(`Cannot update balance`);

        const balance = await getNativeBalance(provider, account, 'latest');
        send({ type: 'updateBalance', balance });
      }
    },
  });
  return { model, machine }
}
