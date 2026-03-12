FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

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

EXPOSE 80
