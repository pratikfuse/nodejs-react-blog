############# Builder 
FROM node:16-alpine as builder

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm install

COPY src/ src/

COPY tsconfig.json .

RUN npm run build

############## App 
FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=prod

COPY  --from=builder /build/dist ./
COPY config/ config/



EXPOSE 3001

CMD ["node", "main.js"]
