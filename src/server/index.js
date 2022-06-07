const React = require("react")
const express = require("express")
const ReactDOMServer = require("react-dom/server")
import App from "../client/App"

const app = express()
const port = 3000
const clientPort = 8080

const clientBundleScript = `<script src="http://localhost:8080/scripts/bundle.js"></script>`; // [B]


app.get('/', (req, res) => {
  const reactApp = ReactDOMServer.renderToString(<App name="me"/>);
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
  console.log(`Example app listening on port ${port}`)
})
