import { Avatar, AvatarProps } from '@mantine/core';
import { useStyles } from './CharacterAvatar.style';

export interface CharacterAvatar extends AvatarProps<'div'> {
}

export const CharacterAvatar: React.FC<CharacterAvatar> = ({ src, className, ...other }) => {
  const { classes, cx } = useStyles();
  return <Avatar
    src={src}
    size={128}
    radius="lg"
    className={cx(classes.avatar, className)}
    {...other}
  />;
};
