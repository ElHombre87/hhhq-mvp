const path = require('path');

const ROOT_PATH = '../src';

module.exports = {
  stories: [
    '../**/*.story.mdx', '../**/*.story.@(js|jsx|ts|tsx)',
    '../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    'storybook-dark-mode',
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
    {
      name: 'storybook-addon-turbo-build',
      options: { optimizationLevel: 2 },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack4',
  },
  // refs: {
  //   'design-system': {
  //     title: 'Storybook Design System',
  //     url: 'https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com',
  //   },
  // },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  // adds absolute imports from the root of the project
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      modules: [
        ...(config.resolve.modules || []),
        path.resolve(__dirname, ROOT_PATH)
      ],
    },
  }),
};
