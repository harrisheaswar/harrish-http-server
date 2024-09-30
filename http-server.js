import http from "http";
import fs from "fs/promises";
import { v4 as uuid4 } from "uuid";
const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/html") {
      const htmlStr = await fs.readFile("./index.html", "utf-8");
      res.writeHead(200, { "content-type": "text/html" });

      console.log("Returned html response");
      res.end(htmlStr);
    } else if (req.url === "/json") {
      const json = await fs.readFile("./index.json", "utf-8");

      res.writeHead(200, { "content-type": "application/json" });
      console.log("Json response returned");

      res.end(json);
    } else if (req.url === "/uuid") {
      res.writeHead(200, { "content-type": "application/json" });

      console.log("UUID in json response sent");
      const uuid = uuid4();

      res.end(JSON.stringify({ uuid }));
    }

    const urlArr = req.url.split("/");

    if (urlArr[1] === "status" && urlArr[2]) {
      const code = parseInt(urlArr[2]);

      if (code >= 100 && code <= 500) {
        res.writeHead(code, { "content-type": "text/plain" });
        res.end(`${code}`);
      } else {
        res.writeHead(400, { "content-type": "text/plain" });
        res.end(`Invalid code`);
      }
    } else if (urlArr[1] === "delay" && urlArr[2]) {
      const time = parseInt(urlArr[2]) * 1000;

      setTimeout(() => {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(`Status code: 200`);
      }, time);
    }
  }
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log("Listening on port 8000....");
});
