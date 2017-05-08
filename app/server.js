import 'babel-polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Helmet from 'react-helmet';
import configureStore from './modules/store';
import routes from './routes';
import HtmlDocument from './htmlDocument';

import { selectLocationState } from './modules/router/router.selectors';

function renderAppToString(store, renderProps) {
  return renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
}

function renderAppToStringAtLocation(url, { webpackDllNames = [], assets, lang }, callback) {
  const memoryHistory = createMemoryHistory(url);
  const store = configureStore({}, memoryHistory);

  syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: selectLocationState(),
  });

  match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      callback({ error });
    } else if (redirectLocation) {
      callback({ redirectLocation: redirectLocation.pathname + redirectLocation.search });
    } else if (renderProps) {
      store.rootSaga.done.then(() => {
        const state = store.getState().toJS();

        const appMarkup = renderAppToString(store, renderProps);

        const doc = renderToStaticMarkup(
          <HtmlDocument
            appMarkup={appMarkup}
            lang={state.locales.language}
            state={state}
            head={Helmet.rewind()}
            assets={assets}
            webpackDllNames={webpackDllNames}
          />
        );

        const html = `<!DOCTYPE html>\n${doc}`;
        callback({ html });
      }).catch((e) => {
        callback({ e });
      });

      renderAppToString(store, renderProps);
      store.close();
    } else {
      callback({ error: new Error('Unknown error') });
    }
  });
}

export {
  renderAppToStringAtLocation,
};
