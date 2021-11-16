FROM node:slim

WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

CMD ["nodemon", "index.js"]