import { SpotlightProvider } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { showNotification } from '@mantine/notifications';
import { Home, Dashboard, FileText, Search } from 'tabler-icons-react';
import links from 'config/navigation';
import { useRouter } from 'next/router';

const mapLinksToActions = (navigate: (url: string) => any): SpotlightAction[] =>
  links.map((link) => ({
    id: `navigation-${link.label.toLowerCase()}`,
    title: link.label,
    description: link.description,
    icon: <link.icon size={18} />,
    group: link.group ?? 'navigation',
    onTrigger: () => navigate(link.href),
  }));

const DEMO_ACTIONS: SpotlightAction[] = [
  {
    id: 'navigation-home-demo',
    title: 'Home',
    description: 'Get to home page',
    onTrigger: () => showNotification({ message: 'Spotlight - Home' }),
    icon: <Home size={18} />,
    group: 'Demo',
  },
  {
    id: 'navigation-dashboard-demo',
    title: 'Dashboard',
    description: 'Get full information about current system status',
    onTrigger: () => showNotification({ message: 'Spotlight - Dashboard' }),
    icon: <Dashboard size={18} />,
    group: 'Demo',
  },
  {
    id: 'navigation-documentation-demo',
    title: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onTrigger: () => showNotification({ message: 'Spotlight - Documentation' }),
    icon: <FileText size={18} />,
    group: 'Demo',
  },
];

const _lower = (t?: string) => t?.toLowerCase() ?? '';
const matches: Array<keyof SpotlightAction> = ['title', 'description', 'group', 'id'];
/** filter the given actions using `query` against a predefined `matches` set of keyof SpotlightAction */
function filterQuery(query: string, actions: SpotlightAction[]): SpotlightAction[] {
  return actions.filter((action) =>
    matches.some((k) => action[k] && _lower(action[k]).includes(_lower(query)))
  );
}

export const CustomSpotlightProvider: React.FC = ({ children }) => {
  const router = useRouter();

  const actions: SpotlightAction[] = [...mapLinksToActions(router.push)] // , ...DEMO_ACTIONS];
  return (
    <SpotlightProvider
      highlightQuery
      zIndex={9999}
      transition="scale"
      actions={actions}
      transitionDuration={50}
      searchPlaceholder="Search..."
      searchIcon={<Search size={18} />}
      // shortcut={['mod + P', 'mod + K', '/']} // bound in _app through hotkeys config
      nothingFoundMessage="Nothing found..."
      filter={filterQuery}
    >
      {children}
    </SpotlightProvider>
  );
};
export default CustomSpotlightProvider;
