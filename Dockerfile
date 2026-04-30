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

# Cloud Run injects environment variables at runtime.
# We use sed to replace placeholders in the built index.html before starting Nginx.
CMD sed -i -e "s|VITE_GEMINI_API_KEY_PLACEHOLDER|${VITE_GEMINI_API_KEY}|g" /usr/share/nginx/html/index.html && \
    sed -i -e "s|VITE_GOOGLE_MAPS_API_KEY_PLACEHOLDER|${VITE_GOOGLE_MAPS_API_KEY}|g" /usr/share/nginx/html/index.html && \
    sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && \
    nginx -g 'daemon off;'
