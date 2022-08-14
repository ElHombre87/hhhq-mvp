import {Text } from '@mantine/core';
import { Welcome } from "components/Welcome";

export const Header = () => (
  <Welcome
    title={<Text inherit variant="gradient" component="span">Web3 testing</Text>}
    text="Testing out xstate with ethers.js integration"
  />
);
