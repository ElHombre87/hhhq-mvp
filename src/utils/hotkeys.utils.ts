import { HotkeyItem } from '@mantine/hooks';
import { Hotkeys, TKbdDescriptorMap, THotkeysCallbacks } from 'types/hotkeys.types';

/**
 * Centralized configuration for keyboard shortcuts.
 * @param hotkeys Hotkeys configuration
 * @returns object to retrieve and bind the hotkeys callbacks
 */
export function registerHotkeys<Config extends TKbdDescriptorMap>(
  hotkeys: Config
): Hotkeys<Config> {
  const config = { ...hotkeys };
  const on = Object.entries(hotkeys).reduce((acc, [name, kbd]) => {
    acc[name as keyof Config] = (callback: (...args: any[]) => any): HotkeyItem => {
      // if (config[name].isUsed) {
      //   throw new Error(`⚠️ Hotkey ${name} already has a registered callback`);
      // }
      config[name].isUsed = true; // mark the hotkey as used
      return [kbd.key, callback];
    };
    return acc;
  }, {} as THotkeysCallbacks<Config>);

  return { config, on };
}
