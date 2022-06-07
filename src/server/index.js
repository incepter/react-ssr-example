const React = require("react")
const express = require("express")
const ReactDOMServer = require("react-dom/server")
import App from "../client/App"

const app = express()

const port = process.env.PORT ?? 3000
const clientAppBaseUrl = process.env.CLIENT_APP_BASE_URL ?? 'http://localhost:8080'

const clientBundleScript =
  `<script src="${clientAppBaseUrl}/scripts/bundle.js"></script>`; 


app.get('*', (_req, res) => {
  const reactApp = ReactDOMServer.renderToString(<App />);
  return res.send(
    `
      <html>
        <head>
        </head>
        <body>
          <div id="root">${reactApp}</div>
          ${clientBundleScript}
        </body>
      </html>
    `
  );
})

app.listen(port, () => {
  console.log(`Started listening at http://localhost:${port}`)
})
