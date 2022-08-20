import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RedditPost } from './Reddit.post';
import mockPosts from './_mocks.posts.json';

const Padding = ({ children, pad }: { pad: number | string; children: React.ReactNode }) => (
  <div style={{ margin: pad }}>
    <div style={{ maxWidth: 600 }}>{children}</div>
  </div>
);
mockPosts[0].selftext = `Nostrud est consequat ad nostrud ipsum voluptate incididunt. Nostrud consequat culpa ipsum occaecat dolore et sunt sunt cillum tempor. Non consequat id ipsum deserunt non fugiat do excepteur consequat esse. Nisi eu minim esse aliquip et adipisicing dolore voluptate culpa cillum duis sint ut. Ut sit sint aliqua esse elit reprehenderit mollit laborum excepteur enim ipsum sit veniam. Amet qui dolore laborum veniam fugiat et consequat culpa ea in sint cillum ut. Cupidatat aliqua laboris minim veniam cillum nulla.
Minim magna consequat proident occaecat quis id irure fugiat pariatur sit. Ut veniam laborum tempor eu enim adipisicing aliqua enim enim ea sint. Ad in mollit proident aliqua. Velit duis aliquip exercitation voluptate amet.
Deserunt nulla amet incididunt ullamco deserunt ipsum tempor anim culpa aute aliquip. Mollit sunt dolore nostrud irure eu. Qui voluptate sunt enim nostrud laborum nostrud est sint.`;

export default {
  title: 'Playground/Reddit/Post',
  component: RedditPost,
  decorators: [(Story) => <Padding pad="3rem">{Story()}</Padding>],
} as ComponentMeta<typeof RedditPost>;

const Template: ComponentStory<typeof RedditPost> = (args) => <RedditPost {...args} />;

export const Vertical = Template.bind({});
Vertical.args = {
  post: mockPosts[0],
  variant: 'vertical',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  post: mockPosts[0],
  variant: 'horizontal',
};
