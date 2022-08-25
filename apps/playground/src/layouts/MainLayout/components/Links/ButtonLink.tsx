import Link from 'next/link';
import { Tooltip, UnstyledButton } from '@mantine/core';
import useStyles from './ButtonLink.styles';
import { NavbarLinkProps } from './types';

export function NavbarButtonLink({ active, onClick, ...link }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  const { href, target, label, icon: Icon } = link;

  return (
    <Link href={href} passHref>
      {/* <Tooltip label={label} position="right" withArrow openDelay={350} zIndex={2000}> */}
        <UnstyledButton
          component="a"
          target={target}
          onClick={onClick}
          className={cx(classes.buttonLink, {
            active,
            subitem: link.subitem,
          })}
        >
          <link.icon size={18} />
        </UnstyledButton>
      {/* </Tooltip> */}
    </Link>
  );
}
