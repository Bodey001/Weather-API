#Using node version 22 as our base image
FROM node:22

#Set the working directory in the container to /app
WORKDIR /app

#Copy package.json and package-lock.json to thw working directory
COPY package*.json ./

#Install application dependencies
RUN npm install

#Install nodemon gloabally
RUN npm install -g nodemon

#Copy the rest of the app into the container
COPY . .

#Set default values for environment variables
ENV PORT=3000
#Expose the port so the computer can access it
EXPOSE 3000

#Run your node.js application
CMD ["npm", "run", "dev"]