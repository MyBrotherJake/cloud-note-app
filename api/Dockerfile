FROM node:16.15.0-alpine


RUN apk add sqlite

RUN mkdir -p /app
WORKDIR /app

ADD ./package.json ./yarn.lock ./
RUN yarn install

ADD . ./
# マイグレーションファイルを元にDB作成
RUN npx prisma migrate reset

CMD ["yarn", "start:dev"]