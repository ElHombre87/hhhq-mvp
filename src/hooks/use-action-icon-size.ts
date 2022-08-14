import { MantineNumberSize } from '@mantine/core';
import { useMemo } from 'react';

export const useActionIconSize = (size: MantineNumberSize): number =>
  useMemo(() => {
    switch (size) {
      case 'xs':
        return 10;
      case 'sm':
        return 12;
      case 'md':
        return 16;
      case 'lg':
        return 16;
      case 'xl':
        return 20;
      default:
        return 16;
    }
  }, [size]);
export default useActionIconSize;
