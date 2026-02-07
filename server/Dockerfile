# Backend Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Railway injects its own PORT - don't hardcode
ENV PORT=5000

# Start server
CMD ["npm", "start"]
