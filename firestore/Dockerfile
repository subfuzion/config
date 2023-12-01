# syntax = docker/dockerfile:1.2

FROM node:21-slim AS builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci
COPY . .

RUN npm run build

ENV NODE_ENV production
EXPOSE 8080

CMD ["npm", "start"]
