# 0x Tracker Client

[![Build Status](https://img.shields.io/travis/0xTracker/0x-tracker-client.svg?style=flat-square)](https://travis-ci.org/0xTracker/0x-tracker-client)
[![Dependencies](https://img.shields.io/david/0xtracker/0x-tracker-client.svg?style=flat-square)](https://github.com/0xTracker/0x-tracker-client)
[![Chat on Spectrum](https://img.shields.io/badge/chat%20on-spectrum-752bf2.svg?style=flat-square)](https://spectrum.chat/0x-tracker)

> Single page application built using React which provides an interface for exploring data from the 0x Tracker API.

# Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [NPM Scripts](#npm-scripts)
- [Continuous Integration](#continuous-integration)
- [Testing](#testing)
- [Browser Support](#browser-support)
- [Maintainers](#maintainers)
- [License](#license)

# 👮‍♂️ Requirements

Whilst the application is served as a static web application at https://0xtracker.com, you'll need [Node.js](https://nodejs.org/en/) installed if you wish to build the application sources. A `.nvmrc` file is provided for the convenience of using [NVM](https://github.com/creationix/nvm).

It's also recommended that you use [Prettier](https://prettier.io) and [ESLint](https://eslint.org) editor plugins if contributing to the project. Pre-commit hooks are in place which will prevent code which doesn't conform to Prettier/ESLint rules from being committed.

# 🐣 Getting Started

The project is configured to work with https://api.0xtracker.com out of the box so getting started is simple. Run the following terminal commands to install dependencies, configure your environment, and launch the development server:

```
$ npm install
$ cp .env.example .env
$ npm start
```

# 🦄 Tech Stack

The project has a fairly extensive set of dependencies, each with a particular purpose. If you plan to contribute to the project then its worthwhile familiarising yourself with most of them.

## Core Libraries

- **[React](https://reactjs.org)** - Manages UI and dom manipulation.
- **[React Router](https://reacttraining.com/react-router/web/guides/philosophy)** - Used for managing application routes.
- **[Redux](https://reduxjs.org)** - Handles global application state.
- **[Redux Persist](https://github.com/rt2zz/redux-persist)** - Allows for persistence of Redux state across browser sessions.
- **[Rematch](https://github.com/rematch/rematch)** - An abstraction over Redux which reduces boilerplate and helps enforce conventions.
- **[Reselect](https://github.com/reduxjs/reselect)** - Eases the creation of performance and composable Redux selectors.
- **[Axios](https://github.com/axios/axios)** - Lightweight HTTP client used for fetching API data.
- **[Lodash](https://lodash.com/)** - Powerful general purpose utility belt for writing clean code.
- **[Date-fns](https://date-fns.org/)** - Modern javascript date utility library which encourages immutable code and plays nicely with Lodash FP.
- **[Moment.js](http://momentjs.com/)** - Begrudgingly used as a fallback when manipulating UTC dates whilst awaiting UTC support in date-fns.
- **[Loadable Components](https://github.com/smooth-code/loadable-components)** - Used for writing async React components which enable [code splitting](https://webpack.js.org/guides/code-splitting/) in the Webpack build process.

## Styling & UI

- **[Bootstrap](http://getbootstrap.com/)/[Reactstrap](https://reactstrap.github.io/)** - UI component library which serves as the basis for most page elements in the project.
- **[Styled Components](https://styled-components.com)** - CSS-in-JS solution used for styling custom components.
- **[Recharts](http://recharts.org/)** - React charting library used for rendering all charts on the site.
- **[Redux Responsive](https://github.com/AlecAivazis/redux-responsive)** - Provides bootstrap breakpoint responsiveness to React components via Redux.
- **[React Icons](https://github.com/react-icons/react-icons)** - Extensive React icon library which provides components for every icon in 0x Tracker's preferred icon set, [Ionicons](https://ionicons.com/).

## Build Process

- **[Webpack](https://webpack.js.org/)** - The heart of the build process, webpack coordinates the execution of various transpiling, bundling, optimisation, and development tools.
- **[Babel](https://babeljs.io)** - Handles transpilation of modern javascript into browser friendly code as well as some code optimisations. By using the [env preset](https://babeljs.io/docs/en/babel-preset-env) and [babel polyfill](https://babeljs.io/docs/en/babel-polyfill) in conjunction with Browserslist, code is transpiled to ensure compatibility with most visitors browsers.
- **[Browserslist](https://github.com/browserslist/browserslist)** - Defines the list of browsers that need to be supported by Babel's transpilation process. [Browserslist-GA](https://github.com/browserslist/browserslist-ga) is used to keep the list in sync with visitor analytics.

## Testing & Linting

- **[Jest](https://jestjs.io/)** - All-in-one Javascript testing framework which executes unit & integration tests.
- **[react-testing-library](https://github.com/kentcdodds/react-testing-library)** - Simple and complete React DOM testing utilities that encourage good testing practices.
- **[timekeeper](https://github.com/vesln/timekeeper)** - Simplifies the testing of time dependant code by allowing you to mock `Date.now`.
- **[ESLint](https://eslint.org/)** - Provides linting for Javascript code ensuring common code quality issues are surfaced and preferred coding conventions are automated.
- **[Prettier](https://prettier.io)** - An opinionated code formatter which ensures consistent formatting across the codebase.
- **[husky](https://github.com/typicode/husky)** - Ensures git pre-commit hooks are in place to enforce ESLint & Prettier rules.
- **[lint-staged](https://github.com/okonet/lint-staged)** - Speeds up pre-commit hooks by ensuring only the modified files are linted.

## Developer Experience

- **[Storybook](https://storybook.js.org/)** - Provides an isolated React component development environment.
- **[React Hot Loader](https://github.com/gaearon/react-hot-loader)** - Enables hot reloading of React components during development.
- **[Error Overlay Webpack Plugin](https://github.com/smooth-code/error-overlay-webpack-plugin)** - Displays runtime errors where you'll see them.
- **[unused-files-webpack-plugin](https://github.com/smooth-code/error-overlay-webpack-plugin)** - Keeps the codebase clean by alerting any unused files
- **[Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)** - Used for analyzing bundle sizes.
- **[Renovate](https://renovatebot.com/)** - Helps keep dependencies up to date by monitoring for updates and automatically opening pull requests.

# 🌳 Project Structure

The project structure is designed to minimize the number of directories, increase discoverability and ensure related code is grouped together. Feature code is grouped based on what "feels right" and is subject to refactoring over time.

If a convention exists for locating configuration files related to developer tooling then it should be followed (e.g. `.babelrc` or `.eslintrc.js`).

- **config** - Tooling configuration which doesn't have a conventional location.
- **public** - Static code files. This directory is combined with bundled assets when building for production and whilst using the development server.
- **src** - Application specific code and test files.
  - **components** - Shared or non-feature specific React components.
  - **features** - Feature code is grouped together to ensure import paths are kept short and reduce navigation.
    - **feature**
      - **components** - React components, each component should be in a separate file.
      - **img** - Any images related to React components.
      - **models** - Rematch models.
      - **selectors** - Redux selectors, use Reselect whenever possible.
      - **util** - Helper functions to support components, models and selectors.
      - **constants.js** - Constants should always be named exports.
      - **get-routes.js** - Provides routes to be used by Redux Router.
      - **prop-types.js** - Common prop-types which get used across multiple React components.
  - **img** - Any images related to shared React components.
  - **redux** - Code used for configuring the global Redux store.
  - **selectors** - Shared or non-feature specific Redux selectors.
  - **styles** - Helpers and constants related to styling (e.g. colors).
  - **test-util** - Helpers related to automated tests.
  - **util** - All other helper functions used to support the codebase.
  - **constants.js** - Shared constants. Each constant should be a named export.
  - **index.js** - Application entry point.
  - **prop-types.js** - Common non-feature specific prop-types.
- **stories** - Storybook stories.

# 🤖 NPM Scripts

A number of NPM scripts are provided for automating common tasks such as building and linting.

- **browsers:list** - List out the projects supported browsers.
- **browsers:update** - Sync the supported browsers with a Google Analytics property, typically only used by project owner.
- **build** - Build a production ready distribution into the `dist` folder.
- **build:analyze** - Build for production and launch Webpack Bundle Analyzer against the resulting bundle.
- **build:serve** - Build for production and serve locally.
- **lint** - Lint all code files in the project.
- **serve** - Serve the last production build locally.
- **start** - Start the development server.
- **storybook** - Start the Storybook application.
- **test** - Run unit/integration tests and produce coverage report.
- **test:watch** - Run unit/integration tests in watch mode.

# 🚨 Continuous Integration

Continuous integration for the project is handled by [Travis CI](https://travis-ci.org/cbovis/0x-tracker-client/builds) which runs linting, tests, and builds the sources for every branch. Merged pull requests are automatically deployed to production.

Hosting is provided by [Netlify](https://netlify.com) which means every pull request gets a deploy preview where the PRs changes can be previewed in a "close to live" environment. Look for the Netlify bot comment on PRs once the build has finished.

## 👨‍💻 Maintainers

- Craig Bovis ([@cbovis](https://github.com/cbovis))

## 👩‍⚖️ License

[Apache 2.0](https://github.com/0xTracker/0x-tracker-worker/blob/master/LICENSE)
