FROM node:lts-alpine as build-stage

ENV APP_HOME=/usr/src/app

RUN mkdir -p $APP_HOME

COPY . $APP_HOME

RUN cd $APP_HOME && npm install 

WORKDIR $APP_HOME

ENV PORT=3000

CMD ["npm", "start"]

EXPOSE 3000