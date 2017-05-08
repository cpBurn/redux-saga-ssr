/* eslint react/no-danger: 0 */

import React, { PropTypes, PureComponent } from 'react';
import htmlescape from 'htmlescape';

export default class HtmlDocument extends PureComponent {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    appMarkup: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
    assets: PropTypes.shape({
      main: PropTypes.shape({
        js: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    webpackDllNames: PropTypes.arrayOf(PropTypes.string),
  };

  render() {
    const { lang, head, appMarkup, state, assets, webpackDllNames } = this.props;
    const attrs = head.htmlAttributes.toComponent();

    return (
      <html lang={lang} {...attrs}>

      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="mobile-web-app-capable" content="yes" />

        {head.title.toComponent()}
        {head.meta.toComponent()}

        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />
        <link href={assets.main.css} rel="stylesheet" />
      </head>

      <body>

      <noscript>
        If you are seeing this message, that means <strong>JavaScript has been disabled on your browser</strong>
        , please <strong>enable JS</strong> to make this app work.
      </noscript>

      <div id="app">
        <div dangerouslySetInnerHTML={{ __html: appMarkup }} />
      </div>

      <script dangerouslySetInnerHTML={{ __html: `APP_STATE = ${htmlescape(state)}` }} />


      {(webpackDllNames || []).map((dllName) =>
        <script data-dll key={dllName} src={`/${dllName}.dll.js`}></script>
      )}

      <script type="text/javascript" src={assets.main.js}></script>

      </body>
      </html>
    );
  }
}
