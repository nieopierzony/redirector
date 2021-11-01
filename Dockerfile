FROM node:16

WORKDIR /usr/src/apps/bot

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD [ "node", "." ]