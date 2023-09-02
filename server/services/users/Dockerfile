FROM node:18.16.0

ENV PORT=4001

WORKDIR /users

COPY ["package.json", "package-lock.json", "/users/"]

RUN npm install && npm cache clean --force

COPY . .

CMD ["node", "--watch", "app"]