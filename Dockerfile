FROM node:16

WORKDIR /app

ADD . /app

CMD npm install
CMD npm run dev