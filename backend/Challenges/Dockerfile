FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force \
    && npm install

COPY . .

EXPOSE 3100

CMD ["npm", "start"]
