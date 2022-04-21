FROM node:16-alpine as builder

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm install

COPY src/ src/

RUN npm run build


FROM node:16-alpine

WORKDIR /app

COPY  --from=builder /build ./