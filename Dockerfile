# Stage 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json & lockfile and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy all source files
COPY . .

# Bake environment variables into the build
ARG VITE_RENTORA_API_BASE_URL
RUN echo "VITE_RENTORA_API_BASE_URL=$VITE_RENTORA_API_BASE_URL" > .env 

# Build the React app
RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# SPA routing
RUN rm /etc/nginx/conf.d/default.conf && \
    echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
    try_files $uri /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]