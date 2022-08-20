import { Menu, Divider, Text, Button, ButtonProps } from '@mantine/core';
import { Settings, Search, Photo, MessageCircle, Trash, ArrowsLeftRight } from 'tabler-icons-react';

export interface WalletButtonMenu extends ButtonProps<'button'> {
  icon: React.ReactNode;
}

export const WalletButtonMenu: React.FC<WalletButtonMenu> = ({ icon, ...props }) => {
  const Control = (
    <Button
      px="xs"
      type="button"
      {...props}
      loading={false}
    >
      {icon}
    </Button>
  );
  return (
    <Menu control={Control}>
      <Menu.Label>Application</Menu.Label>
      <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
      <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
      <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
      <Menu.Item
        icon={<Search size={14} />}
        rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
      >
        Search
      </Menu.Item>

      <Divider />

      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item icon={<ArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
      <Menu.Item color="red" icon={<Trash size={14} />}>Delete my account</Menu.Item>
    </Menu>
  );
};
