# 0x Tracker Client

[![Build Status](https://img.shields.io/travis/0xTracker/0x-tracker-client.svg?style=flat-square)](https://travis-ci.org/0xTracker/0x-tracker-client)
[![Dependencies](https://img.shields.io/david/0xtracker/0x-tracker-client.svg?style=flat-square)](https://github.com/0xTracker/0x-tracker-client)
[![Coverage](https://codecov.io/gh/cbovis/zrx-tracker-client/branch/master/graph/badge.svg?token=gKe1fU8GvI)](https://codecov.io/gh/cbovis/zrx-tracker-client)
[![Chat](https://img.shields.io/gitter/room/0xtracker/general.svg?style=flat-square)](https://gitter.im/0x-tracker/general)

> Single page application built using React which provides an interface for exploring data from the 0x Tracker API.

# Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [NPM Scripts](#npm-scripts)
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

## Core Libraries

- [React](https://reactjs.org) - Manages UI and dom manipulation.
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy) - Used for managing application routes.
- [Redux](https://reduxjs.org) - Handles global application state.
- [Redux Persist](https://github.com/rt2zz/redux-persist) - Allows for persistence of Redux state across browser sessions.
- [Rematch](https://github.com/rematch/rematch) - An abstraction over Redux which reduces boilerplate and helps enforce conventions.
- [Reselect](https://github.com/reduxjs/reselect) - Eases the creation of performance and composable Redux selectors.
- [Axios](https://github.com/axios/axios) - Lightweight HTTP client used for fetching API data.
- [Lodash](https://lodash.com/) - Powerful general purpose utility belt for writing clean code.
- [Date-fns](https://date-fns.org/) - Modern javascript date utility library which encourages immutable code and plays nicely with Lodash FP.
- [Moment.js](http://momentjs.com/) - Begrudgingly used as a fallback when manipulating UTC dates whilst awaiting UTC support in date-fns.
- [Loadable Components](https://github.com/smooth-code/loadable-components) - Used for writing async React components which enable [code splitting](https://webpack.js.org/guides/code-splitting/) in the Webpack build process.

## Styling & UI

- Bootstrap via Reactstrap
- Styled Components
- Recharts
- Redux Responsive
- React Icons

## Build Process

- Webpack
- Babel + Babel Polyfill
- Browserslist (browserslist-ga)

## Testing & Linting

- Jest
- react-testing-library
- timekeeper
- eslint
- prettier
- husky / lint-staged

## Developer Experience

- storybook
- react hot loader
- error-overlay-webpack-plugin
- unused-files-webpack-plugin
- firebase tools
- Webpack Bundle Analyzer
- Renovate
