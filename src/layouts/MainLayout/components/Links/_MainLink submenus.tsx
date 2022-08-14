/**
 * @dev testing submenus for navigation. needs tuning and configuration
 */

export {};
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { Box, Group, Text, UnstyledButton, Collapse } from '@mantine/core';
// import { ChevronLeftIcon, ChevronRightIcon } from '@modulz/radix-icons';

// import type { TNavLink, TNavLinkMenu } from 'config/navigation';
// import useStyles from './MainLink.style'

// const isMenu = (link: TNavLink): link is TNavLinkMenu => {
//   return 'links' in link && link.links.length > 0;
// }

// const isActivePath = (path: string, url: string) => path === url; // && path.startsWith(url);

// const Wrapper: React.FC<{href: string}> = ({href, children}) => !!href ? <Link  href={href} passHref>{children}</Link> : <>{children}</>;

// export default function MainLink({ link }: { link: TNavLink }) {
//   const { asPath } = useRouter();

//   const [isActive, setIsActive] = useState(isActivePath(asPath, link.href));
//   const [open, setOpen] = useState((link as TNavLinkMenu).open || false);
//   const { classes, cx, theme } = useStyles({ open, menu: isMenu(link) });

//   useEffect(() => {
//     setIsActive(isActivePath(asPath, link.href));
//   }, [asPath]);

//   const ChevronIcon = theme.dir === 'ltr' ? ChevronRightIcon : ChevronLeftIcon;

//   const items = (isMenu(link) ? link.links : []).map((link) => (
//     <Link key={link.label} href={link.href} passHref>
//       <Text<'a'>
//         component="a"
//         href={link.href}
//         target={link.target}
//         className={cx(classes.subItem, { active: isActive })}
//         // onClick={(event) => event.preventDefault()}
//       >
//         <Group position="left" spacing='md'>
//           <link.icon size={16} className={classes.linkIcon}/>
//           <Text transform='uppercase' size="xs">{link.label}</Text>
//         </Group>
//       </Text>
//     </Link>
//   ));

//   return (
//     <>
//     <Wrapper href={isMenu(link) ? '' : link.href}>
//       <UnstyledButton
//         component="a"
//         target={link.target}
//         onClick={() => setOpen((o) => !o)}
//         className={cx(classes.link, { [classes.linkActive]: isActivePath(asPath, link.href) })}
//       >
//         <Group position="apart" spacing={0}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <link.icon className={classes.linkIcon}/>
//             <Box ml="md">
//               <Text transform='uppercase' size="xs">{link.label}</Text>
//             </Box>
//           </Box>
//           {isMenu(link) && (
//               <ChevronIcon className={classes.chevron} />
//           )}
//         </Group>
//       </UnstyledButton>
//     </Wrapper>
//     {isMenu(link) ? <Collapse in={open}>{items}</Collapse> : null}
//     </>
//   )
// }
