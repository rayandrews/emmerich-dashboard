FROM node:10-alpine

RUN apk --no-cache --virtual add \
    python \
    python3 \
    make \
    g++

RUN python --version

# Create app directory and set as working directory
RUN mkdir -p /opt/frontend
WORKDIR /opt/frontend

# Install app dependencies (done before copying app source to optimize caching)
COPY package.json /opt/frontend/
COPY yarn.lock /opt/frontend/

RUN yarn

COPY . /opt/frontend

RUN yarn build
