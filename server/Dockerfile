FROM node:16.13.1-alpine3.14

RUN npm install -g nodemon

WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

RUN npm install

COPY . .

ENV PORT=9090

EXPOSE 9090

CMD [ "npm", "run" , "dev"]