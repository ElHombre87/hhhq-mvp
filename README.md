# hhhq-mvp

This project is meant to be at least our MVP for the conglomerate.

The repository is set up as a [`turborepo`](https://turborepo.org/) with [`pnpm`](https://pnpm.io/); use of pnpm is enforced at package.json level.

Main libraries used in the project are 
* `react` and `next.js`
* [`mantine-ui`](https://mantine.dev/) for the ui kit
* [`xstate`](https://xstate.js.org/docs/) as a general purpose state manager
* [`three fiber`](https://docs.pmnd.rs/react-three-fiber) and `three drei` for the webgl section

There is also - as of now - a basic `storybook` configuration to be used to develop individual custom components if needed. Ideally we would want to have a proper library built with storybook, but for the MVP it's not a priority.

## Notes about the turborepo

While the project is set up as a turborepo (monorepo) there is currently no extra custom packages in the `packages` folder: they'll come up when needed for the shared components and functionalities between our various applications, so the repository is set up accordingly.

## Working with visual studio code

There are embedded configuration files for VSC. The recommended extensions are going to change based on what we decide to pull in.
The most important one is the official `xstate extension`, that allows you to generate the `*.typegen.ts` files for your state machines as well as to use the in-editor visualizer and node editor.

> Please install those extensions.
  
If you are not using VSC please follow `xstate` documentation to know how to generate those files.

## Installation and development

Having [`pnpm`](https://pnpm.io/) installed is a requisite, as well as an up to date node version (`>16`, ideally `>18`).

once the environment has been set up do

```
pnpm install
```

and

```
pnpm run dev
```

to launch the development enviroment. main app should be running at `localhost:3000`.


## Project structure

> If needed there is an [`init`](https://github.com/HackerHouseHQ/hhhq-mvp/tree/init) tag in the repository with the previous content of the actual playground to see how the initial concept of the repository was thought.

the main application is currently in `/apps/playground` (folder name WILL change in the future). The project is structured with a `modules` folder where, ideally, we'll put ALL the content specific to a single page or entity that is needed to render a page in the `pages` folder, where you would assemble your pages to be rendered.

Everything that is not "page specific" can go in the global folders (such as `components`, `hooks`, `contexts`, etc).

Ideally each module in the modules folder could (and in some cases *should*) be a separate individual `package`s
