const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const port = process.env.PORT || 3000;
require("fs").writeFileSync("PID", process.pid.toString());
// Create the Express-Next App
const app = next({
  dev: false,
  conf: {
    images: {
      remotePatterns: [
        {
          protocol: "https",

          hostname: "*",
          port: "",
          pathname: "/*",
        },
      ],
    },
  },
});
const handle = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      handle(req, res, parsedUrl);
      console.log("pathname", pathname);
      fs.appendFileSync(
        "app.logs",
        `${new Date().toISOString()} ===> pathname ${pathname}\n`
      );
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
      fs.appendFileSync("app.logs", "server ready!\n");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
