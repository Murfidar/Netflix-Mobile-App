FROM node:18.16.0

ENV PORT=5000

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["node", "--watch", "app"]