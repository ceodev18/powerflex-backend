# Use a base image of Node.js with version 20.14.0
FROM node:20.14.0

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files (if they exist)
COPY package.json yarn.lock ./

# Install the project dependencies
RUN yarn install

# Copy the rest of the project files
COPY . .

# Expose the port on which the NestJS application will run
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start:prod"]
