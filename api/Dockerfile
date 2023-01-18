FROM node:16-slim

RUN apt-get update && apt-get install sqlite3 libsqlite3-dev openssl -y

RUN mkdir -p /app
WORKDIR /app

ADD ./package.json ./yarn.lock ./
RUN yarn install

ADD . ./

CMD ["yarn", "start:dev"]