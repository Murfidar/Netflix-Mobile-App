FROM node:18.16.0

ENV NODE_ENV=production

ENV PORT=4002

WORKDIR /app

COPY ["package.json", "package-lock.json", "/app/"]

RUN npm install && npm cache clean --force

RUN npm install dotenv

COPY . .

RUN npx sequelize-cli db:migrate --env=production

CMD ["node", "--watch", "app"] 