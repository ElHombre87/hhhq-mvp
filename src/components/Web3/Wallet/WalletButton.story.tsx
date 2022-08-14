import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GearIcon } from '@modulz/radix-icons';
import { WalletButton } from './WalletButton';

export default {
  title: 'Web3/Wallet Button',
  component: WalletButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'clicked primary button' },
    onSecondary: { action: 'clicked secondary button' },
  },
} as ComponentMeta<typeof WalletButton>;

const Template: ComponentStory<typeof WalletButton> = (args) => (
  <WalletButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  address: '0x0000000000000000000000000000000000000000',
};

export const Simple = Template.bind({});
Simple.args = {
  ...Default.args,
  onSecondary: undefined,
};

export const NotConnected = Template.bind({});
NotConnected.args = { address: '' };

export const XsCompact = Template.bind({});
XsCompact.args = {
  ...Default.args,
  color: 'violet',
  size: 'xs',
  compact: true,
};
export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  ...Default.args,
  color: 'orange',
  size: 'xl',
};
export const LeftOutlined = Template.bind({});
LeftOutlined.args = {
  ...Default.args,
  left: {
    variant: 'outline',
    radius: 'xl',
  },
};

export const RightOutlined = Template.bind({});
RightOutlined.args = {
  ...Default.args,
  radius: 'xl',
  right: { variant: 'outline' },
};

export const WithOptionIcon = Template.bind({});
WithOptionIcon.args = {
  ...Default.args,
  actionIcon: <GearIcon />,
};
