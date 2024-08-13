
FROM node:latest

RUN mkdir -p /var/www/backend
WORKDIR /var/www/backend
ADD . /var/www/backend/

COPY package*.json ./

RUN npm install

COPY . ./

CMD npm run build && npm run start:prod
EXPOSE 8080