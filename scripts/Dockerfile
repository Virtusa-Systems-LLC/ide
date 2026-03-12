FROM node:20-alpine

WORKDIR /app

COPY css ./css
COPY data ./data
COPY embed ./embed
COPY favicons ./favicons
COPY images ./images
COPY js ./js
COPY vendor ./vendor
COPY index.html ./
COPY manifest.json ./
COPY sw.js ./
COPY serve.js ./

EXPOSE 8080

CMD ["node", "serve.js"]
