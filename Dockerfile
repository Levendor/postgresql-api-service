FROM node:15.5.1-alpine3.12
WORKDIR /usr/src/app
COPY "package*.json" .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "start"]