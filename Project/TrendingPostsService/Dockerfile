#syntax=docker/dockerfile:1

FROM node:alpine
WORKDIR /app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
COPY . .
CMD ["nodemon", "--legacy-watch", "index.js"]

