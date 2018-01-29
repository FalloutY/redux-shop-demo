
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
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root"></div>
        <script type="text/javascript" src="${assets['main.js']}"></script>
        <input id="preloadedState" type="text" value=${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}>
      </body>
    </html>
  `
}

module.exports = renderFullPage;