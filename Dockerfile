FROM node:14.17-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm ci --production --silent && mv node_modules ../
COPY . .
RUN npm ci
#RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "local"]
