import { createStyles } from '@mantine/core';

export default createStyles((theme, props: { color?:string }) => {
  const isHexColor = props.color?.startsWith('#');
  return {
    root: {
      backgroundColor: isHexColor ? props.color : undefined,
    },
  };
});
