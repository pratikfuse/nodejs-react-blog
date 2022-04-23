# REACT BLOG APP

## How to run

### Running locally

- Create a new github app at https://github.com/settings/apps

  - Add the client id and client secret keys for the app to server/config/default.json

- Start the localstack and redis servers using docker
  - Run `docker-compose up localstack redis`
- Start the backend node server

  - Run `cd server`
  - Run `npm install`
  - Run `npm run debug`

- Start the frontend react web app
  - Run `cd web-app`
  - Run `npm install`
  - Run `npm start`

### Running in docker containers

- Add the client id and client secret keys for the github app to ![](server/config/dockerdev.json)
- Start all containers using docker-compose
  - Run `docker-compose up `
