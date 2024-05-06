FROM node:20

WORKDIR /app

COPY ["package*.json", "tsconfig.json",".env", "./"]

RUN npm cache clean --force

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["npm","run","dev"]