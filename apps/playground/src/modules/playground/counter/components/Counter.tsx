import { useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { Center, Group } from '@mantine/core';

import {
  DoubleArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  DoubleArrowRightIcon,
} from '@modulz/radix-icons';

import { counterMachine } from '../machines/counter.machine';
import type { IAction } from '../types';
import NumericInput from './Input.counter';
import CounterButton from './Button.counter';
import Progress from './Progress';

/** input defines the spot where to put the number input */
const actions: Array<IAction | 'input'> = [
  {
    disabledOn: 'min',
    action: 'SET_MIN',
    icon: <DoubleArrowLeftIcon />,
  },
  {
    disabledOn: 'min',
    action: 'DECREMENT',
    icon: <MinusIcon />,
  },
  'input',
  {
    disabledOn: 'max',
    action: 'INCREMENT',
    icon: <PlusIcon />,
  },
  {
    disabledOn: 'max',
    action: 'SET_MAX',
    icon: <DoubleArrowRightIcon />,
  },
];

export default function Counter({ max: _max = 10 }: { max?: number }) {
  /**
   * @dev this SHOULD prevent useMachine warnings when `max` changes, but it doesn't.
   * Prevents warning on "normal" use (with a static prop) which would trigger
   * without.
   */
  const machine = useMemo(
    () => counterMachine.withContext({ ...counterMachine.context, max: _max }),
    [counterMachine, _max]
  );

  const [state, send] = useMachine(machine);
  const { min, max, count } = state.context;

  const actionIcons = useMemo(
    () =>
      actions.map((item, i) => {
        if (item === 'input') {
          return (
            <NumericInput
              key={i}
              value={count}
              min={min}
              max={max}
              onChange={(value) => send({ type: 'SET_VALUE', payload: { value: value ?? min } })}
            />
          );
        }
        const { action, icon, disabledOn } = item;
        return (
          <CounterButton
            icon={icon}
            key={action}
            onClick={() => send(action)}
            disabled={state.matches(disabledOn)}
          />
        );
      }),
    [send, state]
  );

  return (
    <>
      <Center>
        <Progress current={count} max={max} min={min} />
      </Center>
      <Center mt="md" mb="sm">
        <Group align="apart" spacing="xs">
          {actionIcons}
        </Group>
      </Center>
    </>
  );
}
