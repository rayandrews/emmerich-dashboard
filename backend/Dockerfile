FROM node:10-alpine

RUN apk --no-cache --virtual add \
    python \
    python3 \
    make \
    g++
  
# wait for other services
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
RUN chmod +x /wait

# RUN npm install -g yarn

# Create app directory and set as working directory
RUN mkdir -p /opt/backend
WORKDIR /opt/backend

# Install app dependencies (done before copying app source to optimize caching)
COPY package.json /opt/backend/
COPY yarn.lock /opt/backend/

RUN yarn

# Copy app source to container
COPY . /opt/backend

EXPOSE 3000

CMD ["sh", "-c", "/wait && yarn start:prod"]
