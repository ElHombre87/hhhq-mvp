/* eslint-disable max-len */
import { ColorScheme } from '@mantine/core';
import { APP_NAME } from 'config/core/common';
import { setCookies, getCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

/** normalize cookie. lowercase, space replaced with `-` */
export const normalizeCookieName = (name: string) => name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
/** normalize cookie with app name prefixed */
export const getCookieName = (cookie: string) =>
  `${normalizeCookieName(APP_NAME)}-${normalizeCookieName(cookie)}`;

interface LayoutOptions {
  'color-scheme': ColorScheme;
  sidebarCollapsed: boolean;
}
type Keys = keyof LayoutOptions;
type Config<K extends Keys> = LayoutOptions[K];

export { getCookie, setCookies };

// eslint-disable-next-line max-len
export const getCookieGetter = (options?: OptionsType | undefined) => () => {
  const cookie = getCookie(getCookieName('layout-config'), options);
  const config = (!cookie ? {} : JSON.parse((cookie as string) ?? '')) as LayoutOptions;
  return config;
};

export const getLayoutConfigFromCookies = (): Partial<LayoutOptions> => {
  const config = getCookie(getCookieName('layout-config'));
  return !config ? {} : (JSON.parse((config as string) ?? '') as LayoutOptions);
};

export function getConfig<K extends Keys>(
  options: OptionsType | undefined,
  key: K
): Config<K> | undefined;
export function getConfig<K extends Keys, D extends Config<K>>(
  options: OptionsType | undefined,
  key: K,
  _default: D
): Config<K>;
export function getConfig<K extends Keys, D extends Config<K> | never>(
  options: OptionsType | undefined,
  key: K,
  _default?: D
): Config<K> | undefined {
  const cookie = getCookie(getCookieName('layout-config'), options);
  const config = (!cookie ? {} : JSON.parse((cookie as string) ?? '')) as LayoutOptions;
  return !config ? _default : config && config[key] ? config[key] : _default;
}

export const saveLayoutConfig = (options: Partial<LayoutOptions>) => {
  const current = getLayoutConfigFromCookies();
  const next = { ...current, ...options };
  setCookies(getCookieName('layout-config'), JSON.stringify(next), { maxAge: 60 * 60 * 24 * 30 });
};
