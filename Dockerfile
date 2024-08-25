# Use the official Node.js image as the base image
FROM node:22 AS dev
EXPOSE 3000

# Set the working directory inside the container
WORKDIR /workspace

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y git curl && \
    npm install -g @vue/cli
    
COPY ./risk-rally .


# Install project dependencies
RUN npm install 

# Copy the rest of the application code


FROM dev AS deploy

# docker build -t "riskRally" && docker run -it --entrypoint bash -p 3001:3000 riskRally

EXPOSE 3000
WORKDIR /workspace
# Start the Vue development server
RUN npm run build
CMD npx serve -s dist


