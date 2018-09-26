# 0x Tracker

[![codecov](https://codecov.io/gh/cbovis/zrx-tracker-client/branch/master/graph/badge.svg?token=gKe1fU8GvI)](https://codecov.io/gh/cbovis/zrx-tracker-client)

[![CircleCI](https://circleci.com/gh/cbovis/zrx-tracker-client/tree/master.svg?style=svg&circle-token=e1af3445aef64ec8b93eed99d4ed90fa99d1aaf7)](https://circleci.com/gh/cbovis/zrx-tracker-client/tree/master)

# Testing

The project uses [Jest](https://facebook.github.io/jest/) for running tests. Use `$ yarn test` to start the interactive test runner.

Test files should be located alongside the file they're testing following the convention of `filename.test.js`.

# Storybook

[Storybook](https://storybook.js.org) is available for visually testing React components. Use `$ yarn storybook` to start the Storybook environment.

Story files are located in the `stories` folder.

# Deployment

Any changes pushed to the `master` branch will be deployed automatically by [Circle CI](https://circleci.com). Changes to the build process can be made by editing `.circleci/config.yml`.
