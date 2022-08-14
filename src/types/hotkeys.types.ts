import { HotkeyItem } from '@mantine/hooks/lib/use-hotkeys/use-hotkeys';

/** keyboard shortcut descriptor */
export type KbdDescriptor = {
  key: string;
  description: string;
  /** set when a callback is registered for the hotkey */
  isUsed?: boolean;
};
export type HotkeyCallback = (callback: (...args: any[]) => any) => HotkeyItem;

export type TKbdDescriptorMap = Record<string, KbdDescriptor>;

export type THotkeysCallbacks<K extends TKbdDescriptorMap> = Record<keyof K, HotkeyCallback>;
export type THotkeysConfig<K extends TKbdDescriptorMap> = Record<keyof K, KbdDescriptor>;

export type Hotkeys<K extends TKbdDescriptorMap> = {
  config: THotkeysConfig<K>;
  on: THotkeysCallbacks<K>;
};
