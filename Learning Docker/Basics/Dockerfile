#Use an existing docker image as a base
#Download and install the dependency
#Tell the image what to do when it starts as a container

#step1
FROM alpine

#step2 : Install the software
RUN apk add --update redis
RUN apk add --update gcc

#step3: set default commands
CMD [ "redis-server" ]