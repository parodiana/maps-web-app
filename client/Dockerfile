# Frontend Dockerfile - Multi-stage build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build argument for API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the app
RUN npm run build

# Production stage - Use lightweight static server
FROM node:18-alpine

WORKDIR /app

# Install serve globally for static file serving
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5173

# Serve static files
CMD ["serve", "-s", "dist", "-l", "5173"]
