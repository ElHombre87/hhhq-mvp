import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ColorSchemeButton } from './ColorScheme.button';

export default {
  title: 'Core/Color Scheme/Toggle Button',
  component: ColorSchemeButton,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof ColorSchemeButton>;

const Template: ComponentStory<typeof ColorSchemeButton> = (args) => (
  <ColorSchemeButton {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Xs = Template.bind({});
Xs.args = { size: 'xs' };
export const Sm = Template.bind({});
Sm.args = { size: 'sm' };
export const Md = Template.bind({});
Md.args = { size: 'md' };
export const Lg = Template.bind({});
Lg.args = { size: 'lg' };
export const Xl = Template.bind({});
Xl.args = { size: 'xl' };
