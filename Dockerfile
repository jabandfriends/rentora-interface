# Stage 1: Build the Vite app
FROM node:20-alpine AS build

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy source code
COPY . .

# Build the app
RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built app from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create Nginx config directly in Dockerfile
RUN rm /etc/nginx/conf.d/default.conf \
    && echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
    try_files $uri /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
