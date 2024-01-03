FROM node:20

WORKDIR /usr/node/app
RUN npm init -y
RUN npm install express multer @google-cloud/vertexai cors
COPY server/index.js /usr/node/app/index.js
COPY server/config.js /usr/node/app/config.js
COPY server/middleware/ /usr/node/app/middleware/
COPY server/providers/ /usr/node/app/providers/

RUN mkdir /usr/node/app/uploads
CMD [ "node","index.js" ]
EXPOSE 21088
