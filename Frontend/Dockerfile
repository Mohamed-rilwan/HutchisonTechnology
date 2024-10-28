FROM node:19-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
