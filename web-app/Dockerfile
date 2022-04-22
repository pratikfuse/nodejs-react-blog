############################################
# Builder stage to build frontend web app  # 
############################################
FROM node:16-alpine as webapp-builder

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build

#############################################
# NGINX container to serve web app          #
#############################################
FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=webapp-builder /build/build .
EXPOSE 80