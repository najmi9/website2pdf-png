FROM ghcr.io/puppeteer/puppeteer:latest

USER root

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/health || exit 1


CMD ["node", "index.js"]
