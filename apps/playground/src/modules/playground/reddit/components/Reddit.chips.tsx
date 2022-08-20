import { Chip, Chips, Group, GroupPosition, ScrollArea, ScrollAreaProps, Sx } from '@mantine/core';
import React from 'react';
import { useReddit } from '../contexts';
import { useFlairs } from '../hooks';

const Wrapper = ({ children, scroll, ...props }: ScrollAreaProps & { scroll?: boolean }) =>
  scroll ? <ScrollArea {...props}>{children}</ScrollArea> : <>{children}</>;

export const RedditChips: React.FC<{ withScroll?: boolean; position?: GroupPosition }> = ({
  withScroll = false,
  position = 'center',
}) => {
  const [state] = useReddit();
  const { flairs, activeFlairs, setActiveFlairs } = useFlairs();

  const sx: Sx = { display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' };

  return (
    <Wrapper scroll={withScroll} offsetScrollbars>
      <Group position={position} py="md" sx={withScroll ? sx : undefined}>
        {flairs.length > 1 && (
          <Chip
            size="xs"
            radius="sm"
            color="green"
            variant="filled"
            checked={flairs.length === activeFlairs.length}
            onChange={(v) => setActiveFlairs(v ? flairs : [])}
          >
            Select All
          </Chip>
        )}
        <Chips
          multiple
          size="xs"
          radius="sm"
          // position="center"
          value={activeFlairs}
          onChange={setActiveFlairs}
          sx={withScroll ? sx : undefined}
          // mx="xs"
        >
          {flairs.map((flair) => (
            <Chip key={flair.text} value={flair.text} color={flair.background}>
              {flair.text}
            </Chip>
          ))}
        </Chips>
      </Group>
    </Wrapper>
  );
};
