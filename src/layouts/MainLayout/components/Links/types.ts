import { TNavLink } from 'config/navigation';

export interface NavbarLinkProps extends TNavLink {
  active?: boolean;
  onClick?: () => void;
}
