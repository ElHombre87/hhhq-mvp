import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from './Input.temperature';

export default {
  title: 'playground/Temperature/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Celsius = () => Template.bind({});
Celsius.args = {
  value: 0,
  symbol: 'C',
};
export const Kelvin = () => Template.bind({});
Celsius.args = {
  value: 273.15,
  symbol: 'K',
};
export const KelvinError = () => Template.bind({});
Celsius.args = {
  value: -15,
  symbol: 'K',
};
