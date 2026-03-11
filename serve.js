const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = "127.0.0.1";
const PORT = 8080;
const ROOT = __dirname;

const MIME_TYPES = {
    ".css": "text/css; charset=utf-8",
    ".gif": "image/gif",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".md": "text/markdown; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".txt": "text/plain; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
    ".woff": "font/woff",
    ".woff2": "font/woff2"
};

function send(response, statusCode, body, headers = {}) {
    response.writeHead(statusCode, headers);
    response.end(body);
}

function resolvePath(urlPath) {
    const normalized = path.normalize(decodeURIComponent(urlPath).replace(/^\/+/, ""));
    const absolute = path.resolve(ROOT, normalized);

    if (!absolute.startsWith(ROOT)) {
        return null;
    }

    return absolute;
}

const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    let filePath = resolvePath(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);

    if (!filePath) {
        send(response, 403, "Forbidden");
        return;
    }

    fs.stat(filePath, (statError, stats) => {
        if (statError) {
            send(response, 404, "Not Found");
            return;
        }

        if (stats.isDirectory()) {
            filePath = path.join(filePath, "index.html");
        }

        fs.readFile(filePath, (readError, data) => {
            if (readError) {
                send(response, 404, "Not Found");
                return;
            }

            const extension = path.extname(filePath).toLowerCase();
            send(response, 200, data, { "Content-Type": MIME_TYPES[extension] || "application/octet-stream" });
        });
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Judge0 IDE available at http://${HOST}:${PORT}`);
});
