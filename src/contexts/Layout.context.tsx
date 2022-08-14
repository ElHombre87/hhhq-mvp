import { MantineNumberSize, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createUseContext } from 'utils';
import * as cookies from 'utils/cookies.utils';

type HTMLDivRef = RefObject<HTMLDivElement>;

export type RefNames =
    // primary app bar
  | 'appbar'
    // sidebar with navigation
  | 'navbar'
    // Pagelayout wrapper
  | 'wrapper'
    // PageLayout sticky section
  | 'sticky'
    // PageLayout header section
  | 'header';

export type INavbarControls = {
  isOpen: boolean;
  collapsed: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  collapse: () => void;
};

export interface ILayoutContext {
  // TODO: map properly
  refs: Record<RefNames, HTMLDivRef>;
  withAppbar: boolean;
  navbar: INavbarControls;
  size: 'small' | 'medium' | 'large';
  breakpoints: {
    small: MantineNumberSize;
    large: MantineNumberSize;
  }
}

export const BP_SMALL = 'sm';
export const BP_LARGE = 'lg';

/** Get side navbar status and controls */
const _useNavControls = (_forceCollapsed: boolean, smallLayout: boolean): INavbarControls => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const openSidebar = useCallback(() => setNavbarOpen(true), [setNavbarOpen]);
  const toggleSidebar = useCallback(() => setNavbarOpen((state) => !state), [setNavbarOpen]);
  const closeSidebar = useCallback(() => setNavbarOpen(false), [setNavbarOpen]);

  const [forceCollapsed, setCollapsed] = useState(_forceCollapsed);
  const toggleCollapsed = useCallback(() => {
    setCollapsed(!forceCollapsed);
    cookies.saveLayoutConfig({ sidebarCollapsed: !forceCollapsed }); // negate for next state
  }, [forceCollapsed, setCollapsed]);

  useEffect(() => {
    setCollapsed(!smallLayout);
  }, [smallLayout])

  return useMemo(() => ({
    isOpen: navbarOpen,
    collapsed: forceCollapsed,
    open: openSidebar,
    close: closeSidebar,
    toggle: toggleSidebar,
    collapse: toggleCollapsed,
  }), [navbarOpen, forceCollapsed, openSidebar, closeSidebar, toggleSidebar, toggleCollapsed]);
};

const _useLayoutRefs = () => {
  const appbar = useRef<HTMLDivElement>(null);
  const navbar = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  return { appbar, navbar, wrapper, sticky, header };
};

// eslint-disable-next-line max-len
const [LayoutContextProvider, useLayoutContext] = createUseContext<ILayoutContext>({} as ILayoutContext);

export interface LayoutProvider {
  /** if true shows the primary appbar */
  withAppbar?: boolean;
  /** forces the navbar to be collapsed */
  navbarCollapsed?: boolean;
}

/** Context Provider Component */
export const LayoutProvider: React.FC<LayoutProvider> = ({
  children,
  withAppbar = true,
  navbarCollapsed = false,
}) => {
  const theme = useMantineTheme();

  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints[BP_SMALL]}px)`, false);
  const isLarge = useMediaQuery(`(min-width: ${theme.breakpoints[BP_LARGE]}px)`, true);

  const refs = _useLayoutRefs();
  const navControls = _useNavControls(navbarCollapsed, isSmall);

  const value: ILayoutContext = useMemo(() => ({
    refs,
    withAppbar,
    navbar: navControls,
    size: isSmall ? 'small' : isLarge ? 'large' : 'medium',
    breakpoints: {
      small: BP_SMALL,
      large: BP_LARGE,
    },
  }), [refs, navControls, isSmall, isLarge]);

  return <LayoutContextProvider value={value}>{children}</LayoutContextProvider>;
};

export { useLayoutContext };
export function useLayoutNavbar() {
  const { navbar } = useLayoutContext();
  return navbar;
}

/** sum the total height of the provided HTML div refs */
function sumClientHeight(...refs: Array<HTMLDivRef | null>): number {
  return refs
    .filter((el) => el !== null && el.current)
    // @ts-ignore
    .reduce((acc, el) => (acc + el.current ? el.current.clientHeight : 0), 0) || 0;
}

/**
 * get the offset for the sticky element of PageLayout to show shadows, change background etc
 * returned value includes the height of the sticky itself, the page header (if set) and
 * the main Appbar if set
 */
export function useLayoutStickyOffset() {
  const { refs, withAppbar: showAppbar } = useLayoutContext();
  const getOffset = useCallback(
    () => sumClientHeight(refs.sticky, refs.header, showAppbar ? refs.appbar : null),
    [refs.sticky, refs.header, showAppbar, refs.appbar]
  );

  const [stickyOffset, setStickyOffset] = useState<number>(getOffset());
  useEffect(() => setStickyOffset(getOffset()), [getOffset, setStickyOffset]);
  return stickyOffset;
}

export function useLayoutRefs() {
  const { refs } = useLayoutContext();
  return refs;
}

export function useLayoutSize() {
  const { size } = useLayoutContext();
  return size;
}

export function useLayoutBreakpoints() {
  const { breakpoints } = useLayoutContext();
  return breakpoints;
}
