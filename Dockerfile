FROM node:12.16.3
RUN mkdir -p /usr/
WORKDIR /usr/
COPY package.json /usr/
RUN npm install
COPY . /usr/
EXPOSE 3000
CMD ["npm", "start"]