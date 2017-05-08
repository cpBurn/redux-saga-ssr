export default function ensureIntlSupport() {
  if (typeof window !== 'undefined' && window.Intl) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    resolve(require('intl'));
  })
    .then(() => Promise.all([
      require('intl/locale-data/jsonp/en.js'),
      require('intl/locale-data/jsonp/de.js'),
    ]));
}
