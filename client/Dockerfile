FROM node:12.20.1

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --only=production
COPY . .

CMD ["node", "main.js"]
