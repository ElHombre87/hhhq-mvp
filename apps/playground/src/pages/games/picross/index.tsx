import PageLayout from "layouts/PageLayout";
import { PicrossGame, Toolbar } from 'modules/games/picross/Views';
import { PicrossProvider, } from "modules/games/picross/contexts/Picross.context";
import { Alert, Container, Divider, Text, TextProps, Title } from "@mantine/core";

const ExternalLink: React.FC<TextProps<'a'>> = ({href, children = "#", ...props}) => (
  <Text size="sm" variant="link" component="a" href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </Text>
);

function Header() {
  return (
    <Container size="md" my="xl">
      <Title align="center">Picross</Title>
      <Alert mt="xl">
        {/* <Text size="sm"> */}
          Simple implementation of
          a <ExternalLink href="https://it.wikipedia.org/wiki/Nonogram">nonogram</ExternalLink> game, inspired
          by <ExternalLink href="http://liouh.com/picross2/">liouh implementation</ExternalLink>.
        {/* </Text> */}
      </Alert>
      <Divider mt="xl" />
    </Container>
  )
}

export default function PicrossPage() {
  return (
    <PicrossProvider>
      <PageLayout
        // withDevtools={700}
        mt="xl"
        size="xl"
        header={<Header />}
        sticky={<Toolbar />}
      >
        <PicrossGame />
      </PageLayout>

    </PicrossProvider>
  )
}
