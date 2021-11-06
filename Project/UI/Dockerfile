FROM node:alpine
WORKDIR /app
RUN npm install -g ionic
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8100
CMD ["ionic", "serve"]