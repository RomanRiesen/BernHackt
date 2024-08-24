# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /workspace

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y git curl && \
    npm install -g @vue/cli
    
COPY ./risk-rally .

# Copy package.json and package-lock.json
WORKDIR /workspace/RiskRally/risk-rally

#COPY package*.json ./

# Install project dependencies
#RUN npm install 

# Copy the rest of the application code

# Expose port 8080 for the Vue development server
EXPOSE 8080

# Start the Vue development server
#CMD ["npm", "run", "serve"]
