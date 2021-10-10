FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16 AS server

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g pm2

COPY --from=builder /usr/src/app/build ./build

EXPOSE 3000
EXPOSE 9200

CMD npm run start
