# Stage 1: Build the React Application
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app for production (creates the 'dist' folder)
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build output from Stage 1 into Nginx's HTML folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration to handle React routing and Cloud Run's port
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run injects a PORT environment variable. 
# We use a shell command to replace the port in the config file before starting Nginx.
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
