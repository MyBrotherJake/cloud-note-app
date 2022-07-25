FROM node:16.15.0-alpine

RUN mkdir -p /app
WORKDIR /app

ADD ./package.json ./yarn.lock ./
RUN yarn install

ADD . ./

CMD ["yarn", "start:dev"]