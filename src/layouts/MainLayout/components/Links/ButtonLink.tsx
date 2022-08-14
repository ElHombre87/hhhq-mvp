import Link from 'next/link';
import { Tooltip, UnstyledButton } from '@mantine/core';
import useStyles from './ButtonLink.styles';
import { NavbarLinkProps } from './types';

export function NavbarButtonLink({ active, onClick, ...link }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Link href={link.href} passHref>
      <Tooltip label={link.label} position="right" withArrow openDelay={350}>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.buttonLink, {
            active,
            subitem: link.subitem,
          })}
        >
          <link.icon size={18} />
        </UnstyledButton>
      </Tooltip>
    </Link>
  );
}
