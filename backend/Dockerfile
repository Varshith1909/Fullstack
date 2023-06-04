FROM node:18

RUN npm install -g pnpm

WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .
EXPOSE 8081
ENV ADDRESS=0.0.0.0 PORT=8081 DB_HOST=postgres DB_PORT=5432 DB_NAME=doggr DB_USER=doggr DB_pass=doggr

RUN pnpm build
#RUN pnpm db:reset

CMD ["pnpm","startProd"]
