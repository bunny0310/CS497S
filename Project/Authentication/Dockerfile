FROM node:slim

WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
COPY . .

CMD ["nodemon", "index.js"]