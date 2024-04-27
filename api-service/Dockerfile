FROM node:20 as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .

FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .

EXPOSE 3000

CMD ["node", "src/index.js"]