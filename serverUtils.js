
const assets = require('./build/asset-manifest.json');


const renderFullPage = (html, preloadedState) => {
  return `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500,700" rel="stylesheet">
        <title>React App X</title>
        <link rel="stylesheet" href="${assets['main.css']}">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script type="text/javascript" src="${assets['main.js']}"></script>
      </body>
    </html>
  `
}

module.exports = renderFullPage;