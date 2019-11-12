FROM node:alpine

# wait for other services
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
RUN chmod +x /wait

RUN npm install -g yarn

# Create app directory and set as working directory
RUN mkdir -p /opt/backend
WORKDIR /opt/backend

# Use default node (non-root) user
RUN chown node:node /opt/backend
USER node

# Install app dependencies (done before copying app source to optimize caching)
COPY --chown=node:node package.json /opt/backend/
COPY --chown=node:node yarn.lock /opt/backend/

RUN yarn

# Copy app source to container
COPY --chown=node:node . /opt/backend

EXPOSE 3000

CMD ["sh", "-c", "/wait && yarn start:prod"]
