const http = require("http");
const fs = require("fs");
const path = require("path");

function servePage(res, filePath, statusCode = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 - Internal Server Error</h1>");
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
}

const app = http.createServer((req, res) => {
  let filePath;
  if (req.url === "/home" || req.url === "/") {
    filePath = path.join(__dirname, "pages", "home.html");
    servePage(res, filePath);
  } else if (req.url === "/about") {
    filePath = path.join(__dirname, "pages", "about.html");
    servePage(res, filePath);
  } else if (req.url === "/contact") {
    filePath = path.join(__dirname, "pages", "contact.html");
    servePage(res, filePath);
  } else {
    filePath = path.join(__dirname, "pages", "404.html");
    servePage(res, filePath, 404);
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is up and running on port http://localhost:${PORT}`);
});
