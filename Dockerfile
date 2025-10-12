# Use a Node.js base image with Yarn pre-installed
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to leverage Docker's layer caching for dependencies
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port your application listens on
EXPOSE 3000

# Define the command to run your application in development mode
CMD ["yarn", "start:dev"]