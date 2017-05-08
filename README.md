# React Boilerplate

React boilerplate built on top of [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate):

## Quick start

1. yarn
2. npm start to run the project

## Features

<dl>
  <dt>Redux</dt>
  <dd>Unidirectional data flow allows for change logging and time travel debugging.</dd>

  <dt>ES6 / Babel</dt>
  <dd>Use template strings, object destructuring, arrow functions, JSX syntax and more, today.</dd>

  <dt>SASS</dt>
  <dd>Write composable CSS that's co-located with your components for complete modularity.</dd>

  <dt>React Router</dt>
  <dd>It's natural to want to add pages (e.g. `/about`) to your application, and routing makes this possible.</dd>

  <dt>Hot Module Replacement</dt>
  <dd>Enjoy the best developer experience and code your app at the speed of thought! Your saved changes to the CSS and JSare reflected instantaneously without refreshing the page. Preserve application state even when you update something in the underlying code!</dd>

  <dt>React Intl</dt>
  <dd>Scalable apps need to support multiple languages, easily add and support multiple languages with `react-intl`.</dd>

  <dt>Offline-first</dt>
  <dd>The next frontier in performant web apps: availability without a network connection from the instant your users load the app.</dd>

  <dt>SEO</dt>
  <dd>We support SEO (document head tags management) for search engines that support indexing of JavaScript content. (eg. Google)</dd>
</dl>

## Tech Stack

Here's a curated list of packages that you should have knowledge of, before starting your awesome project. However, the best way to have a complete list of dependencies is to see [package.json](https://github.com/apptension/react-boilerplate/blob/master/package.json).

#### Core

- [ ] [React](https://facebook.github.io/react/)
- [ ] [React Router](https://github.com/ReactTraining/react-router)
- [ ] [React Intl](https://github.com/yahoo/react-intl)
- [ ] [Redux](http://redux.js.org/)
- [ ] [Redux Saga](https://redux-saga.github.io/redux-saga/)
- [ ] [Redux Sauce](https://github.com/skellock/reduxsauce/)
- [ ] [Reselect](https://github.com/reactjs/reselect)
- [ ] [ImmutableJS](https://facebook.github.io/immutable-js/)

#### Development

- [ ] [Webpack 2](https://webpack.js.org/)
- [ ] [Redux Devtools](https://github.com/gaearon/redux-devtools/)
- [ ] [React Hot Loader 3](https://github.com/gaearon/react-hot-loader/)

#### Styling

- [ ] [Sass](http://sass-lang.com/)
- [ ] [Normalize.css](https://necolas.github.io/normalize.css/)

#### Testing

- [ ] [Mocha](https://mochajs.org/)
- [ ] [Sinon](http://sinonjs.org/)
- [ ] [Chai](http://chaijs.com/)
- [ ] [Enzyme](https://github.com/airbnb/enzyme)
- [ ] [Istanbul](https://github.com/gotwarlost/istanbul/)

#### Linting

- [ ] [ESlint](http://eslint.org/)

## Project Structure

#### `app/`

You will write your app in the this folder. This is the folder you will spend most, if not all, of your time in. 

#### `app/routes`

This folder contains subfolders - one for each route of your application with `components`, `containers`, `styles` and `tests`
inside. We recommend using flat structure which means that you should put each route as a child of this directory regardless
of view relationship.

#### `app/modules`

This folder contains `reducers`, `actions`, `constants`, `sagas` and `selectors` grouped in modules which means thath you
should keep your business loigc here
 
#### `app/environment`
 
This folder contains environment configs. Webpack uses proper config depending on application environment. Config can be used 
by importing `env-config`
  
#### `app/fixtures`

This boilerplate comes with preconfigured fixtures integration which means that you can put any `.json` files in this
folder and easily fetch it as fixtures using sagas. Those files are available by calling `/fixtures/*.json` url.

#### `app/styles`

In this folder you should put any global styles that cannot be placed in routes.

#### `app/translations`

This is the place to keep `.json` files with translation messages. You should not move this directory in order for messages 
 generation feature to work. 
 
#### `app/images`

This folder contain any images used in your application. `/sprites` directory is used by `spritesimth` plugin.

#### `internals/`

You can call this area the "engine" of your app. Your source code cannot be executed as-is in the web browser.
It needs to pass through webpack to get converted into a form that web browsers understand. While it's certainly 
helpful to understand what is happening here, for real world usage you won't have to mess around with this folder much.

- `internals/webpack`: `webpack` configuration
- `internals/scripts`: scripts used in `package.json`
- `internals/testing/test.index.spec.js`: entry point for unit tests. You should put any global mocks and add unit test configuration here

#### `server/`

As the name suggests, this folder contains development and production server configuration.

## Command Line Commands

#### Initialization

```Shell
npm run setup
```

Initializes a new project with this boilerplate. Deletes the `react-boilerplate`
git history, installs the dependencies and initializes a new repository.

> Note: This command is self-destructive, once you've run it the init script is
gone forever. This is for your own safety, so you can't delete your project's
history irreversibly by accident.

#### Development

```Shell
npm start
```

Starts the development server running on `http://localhost:3000`

```Shell
npm start:tunnel
```

Starts the development server and makes your application accessible at
`localhost:3000`. Tunnels that server with `ngrok`, which means the website
accessible anywhere! Changes in the application code will be hot-reloaded.

#### Building

```Shell
npm run build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the `build` folder.

Upload the contents of `build` to your web server to
see your work live!

#### Testing

```Shell
npm run test
```

Tests your application with the unit tests specified in the `**/__tests__/*.spec.js` files
throughout the application.

```Shell
npm run test:watch
```

Watches changes to your application and re-runs tests whenever a file changes.

```Shell
npm run test:coverage
```

Generates test coverage.

```Shell
npm run analyze
```
This command will generate a `stats.json` file from your production build, which
you can upload to the [webpack analyzer](https://webpack.github.io/analyse/). This
analyzer will visualize your dependencies and chunks with detailed statistics
about the bundle size.

#### Linting

```Shell
npm run lint
```

Lints your JavaScript.

#### Messages

```Shell
npm run extract-intl
```

Automatically generates `.json` files with messages gathered from application.

## License

This project is licensed under the MIT license.
