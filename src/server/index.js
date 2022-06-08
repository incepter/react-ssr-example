import Greeting from "../client/Greeting";

const React = require("react")
import "isomorphic-fetch"
const express = require("express")
const ReactDOMServer = require("react-dom/server")
import App from "../client/App"

const app = express()

const port = process.env.PORT ?? 3000

const clientAppBaseUrl = process.env.CLIENT_APP_BASE_URL ?? 'http://localhost:8080'

const clientBundleScript =
  `<script src="${clientAppBaseUrl}/scripts/bundle.js"></script>`;


app.get('*', async (request, res) => {
  const {path, url} = request;

  let reactApp = null;

  let routeData = {};
  if (path === "/greeting") {
    const name = url.match(/\/greeting\?name=(.*?)$/i)?.[1];
    reactApp = ReactDOMServer.renderToString(<Greeting name={name} />);
  } else {
    let users = await fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())

    routeData = {users};
    reactApp = ReactDOMServer.renderToString(<App users={users} />);
  }

  return res.send(
    `
      <html>
        <head>
            <script>
                window.hydrationData = ${JSON.stringify(routeData)}
            </script>
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

// const app = express()
//
// app.get("*", (request, response) => {
//
//
//   const parsedRoute = parseRoute(request);
//   const currentUser = resolveUser(request);
//   const {isSupported, isProtected, params} = parsedRoute;
//
//   const canSeeRoute = isAllowedToSeeRoute(currentUser, parsedRoute);
//
//   const name = request.params.name || "world!";
//   console.log(`received a request to ${name}`)
//
//   response.send(`
//     <html>
//       <body>
//         <p>
//           Hello, ${name}
//         </p>
//       </body>
//     </html>
//   `);
// })
//
// app.listen(4000, () => {
//   console.log('APP STARTED http://localhost:4000')
// })
