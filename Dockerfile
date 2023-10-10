###########################
## BUILD FOR DEVELOPMENT ##
###########################

FROM node:20.8-alpine as Development

WORKDIR /usr/apps

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . /usr/apps

USER node
