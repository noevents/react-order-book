export default function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
    <head>
      <style>
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center
        }
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        th, td {
          padding: 2px 10px;
        }
      </style>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>order book</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `
}