#specify a base image
FROM node:14-alpine

WORKDIR /usr/app
# WORKDIR /the/workdir/path

#install some dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./
# COPY ./ ./   
# => Copy - Path to folder to copy from on your machine relative to build context - Place to copy stuff inside the container.
# Inshort, we will copy everything from our current working directory into the contianer
#Default command
CMD [ "npm","start" ]