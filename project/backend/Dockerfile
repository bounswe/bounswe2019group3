FROM node:10.15.0-alpine
EXPOSE 3000 9229

WORKDIR /backend

COPY . /backend

RUN npm install

RUN npm run generate-api-docs

CMD ./start.sh