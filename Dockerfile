FROM node:7

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# RUN npm install --only=production

COPY . .



EXPOSE 3001

CMD [ "npm", "yarn clean-client && yarn --cwd ./client build"]
CMD [ "npm", "start"]
