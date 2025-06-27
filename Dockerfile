FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./app ./app

CMD ["node", "app/index.js"]