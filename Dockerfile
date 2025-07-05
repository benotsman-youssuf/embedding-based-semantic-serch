# Use the official Node.js image from the Docker Hub
FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "/src/index.js"]