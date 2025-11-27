# Stage 1: Build stage
FROM node:20-alpine AS builder

# Enable corepack to use pnpm
RUN corepack enable

# Set working directory
WORKDIR /usr/src/app

# Copy package files for dependency caching
COPY ../package.json ../pnpm-lock.yaml ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy source code and build configs
COPY ../ ./

# Build the application
RUN pnpm run build

# Stage 2: Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY ../package.json ../pnpm-lock.yaml ./

# Copy dependencies from builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/src/main"]
