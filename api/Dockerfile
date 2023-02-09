FROM node:16-slim

RUN apt-get update && apt-get install sqlite3 libsqlite3-dev openssl procps -y

RUN mkdir -p /app
WORKDIR /app

ADD ./package.json ./yarn.lock ./
RUN yarn install

ADD . ./
RUN yarn prisma generate && yarn prisma db push

CMD ["yarn", "start:dev"]
