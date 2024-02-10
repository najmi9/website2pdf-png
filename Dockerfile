FROM ghcr.io/puppeteer/puppeteer:latest

USER root

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

RUN npx puppeteer browsers install chrome

COPY . .

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:5000/health || exit 1


CMD ["node", "index.js"]
