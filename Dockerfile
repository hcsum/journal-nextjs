FROM node:20-alpine

USER node

RUN mkdir /app

WORKDIR /app

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build
CMD node src/server/app.js