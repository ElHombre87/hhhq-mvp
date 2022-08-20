import { useMemo } from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { ChevronDownIcon } from '@modulz/radix-icons';
import { Wallet } from 'tabler-icons-react';

import { trimString } from 'libs/trim-string';
import { ButtonsGroup } from 'components/ButtonGroup/ButtonGroup';

import useStyles from './WalletButton.style';
// import { WalletButtonMenu } from './WalletButton.menu';

interface PartialButton extends Omit<ButtonProps<'button'>, 'children' | 'leftIcon' | 'rightIcon' | 'type'>{}

/** Shared common props for custom button setup */
export interface WalletButtonBase {
  /** Address we're connected to */
  address:string;
  /** Text to show if wallet is not connected */
  text?:string;
  /** Icon to show next to the address/text */
  icon?: React.ReactNode;
  iconSide?: 'left' | 'right';
  /** Icon component for the secondary button */
  actionIcon?: React.ReactNode;
  /** Click action for the secondary button. if missing the button won't be rendered */
  onSecondary?: () => void;
  // onClick?: () => void;
  /** extra props for the left button */
  left?: PartialButton;
  /** extra props for the right button */
  right?: PartialButton;
}

/** Default interface. picked when no customization to left or right are applied */
export interface WalletButton extends WalletButtonBase, PartialButton {}

/**
 * Wallet button control with (optional) secondary customizable action
 */
export const WalletButton: React.FC<WalletButton> = ({
  address,
  onSecondary,
  text = 'Connect',
  icon = <Wallet size={16} />,
  actionIcon = <ChevronDownIcon />,
  iconSide = 'left',
  loading,
  ...props
}) => {
  const btnText = useMemo(() => address ? trimString(address, 4, 4) : text, [address]);
  const leftIcon = iconSide === 'left' ? icon : undefined;
  const rightIcon = iconSide === 'right' ? icon : undefined;

  const { classes, cx } = useStyles({ color: props.color });

  if (onSecondary === undefined) {
    return (
      <Button
        type="button"
        uppercase={!address}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        disabled={!props.onClick}
        loading={loading}
        classNames={{ root: cx(classes.root, props.classNames?.root), ...props.classNames }}
        {...props}
      >
        {btnText}
      </Button>
    );
  }
  // eslint-disable-next-line max-len
  const { left = {}, right = {}, onClick, className, ...rest } = props;
  const isSplit = left || right;

  const leftProps:ButtonProps<any> = isSplit ? { ...rest, ...left } : props;
  const rightProps:ButtonProps<any> = isSplit ? { ...rest, ...right } : props;

  return (
    // @ts-ignore -- props collision, but they work regardless
    <ButtonsGroup className={className} {...rest}>
      <Button
        type="button"
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        disabled={!onClick}
        onClick={onClick}
        loading={loading}
        {...leftProps}
        radius={0}
        uppercase={!address}
        classNames={{ root: cx(classes.root, props.classNames?.root), ...props.classNames }}
      >
        {btnText}
      </Button>
      {/* <WalletButtonMenu icon={actionIcon} {...rightProps} /> */}
      <Button
        type="button"
        onClick={onSecondary}
        px="xs"
        {...rightProps}
        loading={false}
      >
        {actionIcon}
      </Button>
    </ButtonsGroup>
  );
};
