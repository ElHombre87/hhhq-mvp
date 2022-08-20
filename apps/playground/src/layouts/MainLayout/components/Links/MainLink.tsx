import Link from 'next/link';
import { Box, Text, UnstyledButton } from '@mantine/core';
import useStyles from './MainLink.styles';
import { NavbarLinkProps } from './types';

export function MainLink({ active, onClick, ...link }: NavbarLinkProps) {
  // const { asPath: path } = useRouter();
  const { classes, cx } = useStyles();

  const { href, target, label, icon: Icon } = link;
  const btnClasses = cx(classes.link, {
      [classes.active]: active,
      [classes.subitem]: link.subitem,
    });

  return (
    <>
      <Link href={href} passHref>
        <UnstyledButton component="a" target={target} onClick={onClick} className={btnClasses}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon className={classes.icon} size={18} />
            <Text transform="uppercase" size="xs">
              {label}
            </Text>
          </Box>
        </UnstyledButton>
      </Link>
    </>
  );
}

export default MainLink;
