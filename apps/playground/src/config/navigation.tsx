import { WithOptional } from 'libs/types';
import {
  Bolt,
  BrandReddit,
  DeviceTv,
  Home,
  Icon
  as
  TablerIcon,
  ListCheck,
  PlayerPlay,
  ThreeDCubeSphere,
  Puzzle2
} from 'tabler-icons-react';

/**
 * @dev
 * Temporary navigation links setup for a single menu
 */

export type TSimpleNavLink = {
  label: string;
  icon: TablerIcon;
  href: string;
  target: React.HTMLAttributeAnchorTarget;
  /**
   * Quick summary of what the link/page is for.
   * used in spotlight and other descriptive places
   */
  description?: string;
  subitem?: boolean;
  /** used in spotlight to organize navigation links */
  group?: string;
};

export type TNavLink = TSimpleNavLink; // | TNavLinkMenu;
export type TPartialLink = WithOptional<TNavLink, 'href' | 'target'>;

// export type TNavLinkMenu = Exclude<TSimpleNavLink, 'href' | 'target'> & {
//   links: TSimpleNavLink[];
//   open: boolean;
// }
// export type TNavLinkMenuBuilder = WithOptional<TNavLinkMenu, 'open'>;

const Link = (link: TPartialLink): TNavLink => ({
  href: '#',
  target: '_self',
  subitem: false,
  ...link,
});

const links: TNavLink[] = [
  Link({ label: 'Home', icon: Home, href: '/' }),
  Link({
    label: 'Playground',
    icon: PlayerPlay,
    href: '/playground',
    description: 'Testing ground for stuff',
  }),
  Link({
    label: 'Todo App',
    icon: ListCheck,
    href: '/playground/todo',
    description: 'A simple todo app',
    group: 'playground',
    subitem: true,
  }),
  // Link({
  //   label: 'Reddit Deck',
  //   icon: BrandReddit,
  //   href: '/playground/reddit',
  //   description: 'Quickly explore subreddits',
  //   group: 'playground',
  //   subitem: true,
  // }),
  Link({
    label: 'ThreeJS',
    icon: ThreeDCubeSphere,
    href: '/threejs',
    description: 'ThreeJS playground',
    group: 'playground',
    subitem: true,
  }),
  Link({
    label: 'Rick & Morty',
    icon: DeviceTv,
    href: '/playground/rick-and-morty',
    description: 'Rick & Morty API viewer',
    group: 'playground',
    subitem: true,
  }),
  Link({
    label: 'Picross',
    icon: Puzzle2,
    href: '/games/picross',
    description: 'Picross puzzle game',
    group: 'Games',
  }),
  Link({
    label: 'Web3 Testing',
    icon: Bolt,
    href: '/web3',
    description: 'Testing custom web3 implementation',
    group: 'Web3',
  }),
  /** Testing nested navigation links with submeno */
  // Link({
  //   label: 'playground',
  //   icon: PlayerPlay,
  //   href: '/playground/',
  //   description: 'Testing ground for stuff'
  //   open: true,
  //   links: [
  //     Link({ label: 'Todo App', icon: ListCheck, href: '/playground/todo' }),
  //   ]
  // }),
];

export default links;
