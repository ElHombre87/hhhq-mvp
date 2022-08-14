import { Title, Text, Anchor } from '@mantine/core';
import useStyles from './Welcome.styles';

interface WelcomeProps {
  title?: React.ReactNode;
  text?: React.ReactNode;
  showText?:boolean
}

const DefaultTitle = () => (
  <>
  Welcome to{' '}
  <Text inherit variant="gradient" component="span">
    Mantine
  </Text>
  </>
);

const DefaultText = () => (
  <>
  This starter Next.js project includes a minimal setup for server side rendering, if you want
  to learn more on Mantine + Next.js integration follow{' '}
  <Anchor href="https://mantine.dev/theming/next/" size="lg">
    this guide
  </Anchor>
  . To get started edit index.tsx file.
  </>
);

export function Welcome({
  title = <DefaultTitle />,
  text = <DefaultText />,
  showText = true,
}: WelcomeProps) {
  const { classes } = useStyles();

  return (
    <>
      <Title order={1} className={classes.title} align="center" mt="xl">
        {title}
      </Title>
      {showText &&
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        {text}
      </Text>}
    </>
  );
}

export default Welcome;
