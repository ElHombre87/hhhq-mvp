import { Header } from "modules/web3/testing";
import PageLayout from "layouts/PageLayout";
import { Button, Group, Title } from "@mantine/core";

import { useInterpret, useSelector } from "@xstate/react";
import { showNotification } from "@mantine/notifications";
import { InfoCircle, X } from "tabler-icons-react";

import { createWalletMachine } from "libs/web3/xstate-web3";
import { useCallback } from "react";
import { AddEthereumChainParameter, ProviderRpcError } from "libs/web3/xstate-web3/types";

const maticNetwork: AddEthereumChainParameter = {
  rpcUrls: ['https://polygon-rpc.com', ],
  chainName: 'Polygon Mainnet',
  nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
  blockExplorerUrls: ['https://polygonscan.com'],
  chainId: 137,
};

// const MATIC = maticNetwork.nativeCurrency;]]==]

const { machine } = createWalletMachine();

// REACT //////////////////////////////////////////////////////////////////////


export function Web3TestingPage() {
  const service = useInterpret(machine, {
    devTools: true,
    actions: {
      // notifyAccount: (ctx, event) => {
      //   showNotification({
      //     title: 'Account connected',
      //     message: ctx.account,
      //     color: 'cyan',
      //     icon: <InfoCircle size={16} />,
      //   });
      // },
      notifyError: (_, event) => {
        const { data } = event as { data: ProviderRpcError };
        console.info('⚠️ wallet error:', data)
        showNotification({
          title: `Wallet Error ${data.code ?? ''}`,
          message: `${data.message}`,
          color: 'red',
          icon: <X size={16} />,
        });
      },
    }
  });
  const context = useSelector(service, state => state.context);
  const needsMetamask = useSelector(service, state => state.matches('error'));
  const connected = useSelector(service, state => state.matches('ready.connected'));
  const connecting = useSelector(service, state => state.matches('ready.connecting'));

  const connect = useCallback(() => {
    if (!service?.send) return;
    service.send({type: 'connect', desiredChain: 250 });
    // service.send({type: 'connect', desiredChain: maticNetwork });
  }, [service.send]);
  
  return (
    <PageLayout
      withDevtools={700}
      sx={{sticky: theme => ({ paddingBottom: 0, paddingTop: theme.spacing.xl })}}
      withShadow={false}
      size={2560}
      header={<Header />}
    >
      <Group position="center">
        <Button loading={connecting} onClick={connect}>{connected ? 'derp' : 'connect'}</Button>
      </Group>
      {needsMetamask && <Title>Install metamask</Title>}
      <Title order={3}>state machine context</Title>
      <p>context: {JSON.stringify(context)}</p>
      <div style={{height: '200vh'}} />
    </PageLayout>
  );
}


// EXTERNAL PROVIDER FOR WEB3 // TODO: replace with xstate wallet context provider

// function getWeb3Library(provider: any): ethers.providers.Web3Provider {
//   return new ethers.providers.Web3Provider(provider);
// }
export default function Web3() {
  return (
    // <Web3ReactProvider getLibrary={getWeb3Library}>
      <Web3TestingPage />
    // </Web3ReactProvider>
  )
}
