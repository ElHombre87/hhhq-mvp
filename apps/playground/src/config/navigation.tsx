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
    label: 'ThreeJS',
    icon: ThreeDCubeSphere,
    href: '/threejs',
    description: 'ThreeJS playground',
  }),
];

export default links;
