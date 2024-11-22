FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm run install

COPY . .

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start"]